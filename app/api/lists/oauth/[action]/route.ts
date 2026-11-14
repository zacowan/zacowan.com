import { z } from "zod";
import { getDb } from "@/lib/db";
import { oauthClients, oauthGrants } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
	authorization,
	exchange,
	issueCode,
	issuer,
	limit,
} from "@/lib/lists/oauth";
import {
	equalSecret,
	hash,
	randomToken,
	signConsent,
	validRedirect,
	verifyConsent,
} from "@/lib/lists/crypto";

export const runtime = "nodejs";
const secureHeaders = {
	"Cache-Control": "no-store",
	"Content-Security-Policy":
		"default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",
	"X-Content-Type-Options": "nosniff",
	"Referrer-Policy": "no-referrer",
};
const json = (value: unknown, status = 200) =>
	Response.json(value, {
		status,
		headers: {
			"Cache-Control": "no-store",
			"Access-Control-Allow-Origin": "*",
		},
	});
const escape = (s: string) =>
	s.replace(
		/[&<>"']/g,
		(c) =>
			({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
				c
			] ?? c,
	);
const signingSecret = () => process.env.LISTS_OWNER_PASSWORD;

export async function GET(
	request: Request,
	context: { params: Promise<{ action: string }> },
) {
	if ((await context.params).action !== "authorize")
		return json({ error: "not_found" }, 404);
	if (!signingSecret())
		return json({ error: "Owner sign-in has not been configured." }, 503);
	try {
		const auth = await authorization(new URL(request.url).searchParams);
		const csrf = randomToken();
		const consent = signConsent(
			{
				query: new URL(request.url).search,
				csrf: hash(csrf),
				expires: Date.now() + 600000,
			},
			signingSecret() as string,
		);
		return new Response(
			`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Authorize lists editing · Zach Cowan</title><style>body{background:#090909;color:#ededed;font:16px/1.6 system-ui;margin:0;padding:24px}main{max-width:460px;margin:12vh auto}h1{font-size:28px}p{color:#aaa}label{display:block;margin-top:24px}input,button{box-sizing:border-box;font:inherit;padding:12px;width:100%;margin-top:8px;border:1px solid #555;border-radius:4px}input{background:#111;color:white}button{cursor:pointer;background:white;color:black}a{color:inherit}:focus-visible{outline:2px solid white;outline-offset:4px}</style></head><body><main><a href="/lists">← Lists</a><h1>Authorize lists editing</h1><p><strong>${escape(auth.clientName)}</strong> will be able to read and edit your lists, ratings, and reviews. Changes publish immediately.</p><p>Requested callback: ${escape(auth.redirectUri)}</p><form method="post" action="/api/lists/oauth/authorize"><input type="hidden" name="consent" value="${escape(consent)}"><label for="password">Owner password</label><input id="password" name="password" type="password" autocomplete="current-password" required maxlength="1024"><button type="submit">Sign in and authorize</button></form><p><a href="/lists">Cancel</a></p></main></body></html>`,
			{
				headers: {
					...secureHeaders,
					"Content-Type": "text/html; charset=utf-8",
					"Set-Cookie": `lists_consent=${csrf}; HttpOnly; SameSite=Lax; Path=/api/lists/oauth; Max-Age=600${issuer().startsWith("https:") ? "; Secure" : ""}`,
				},
			},
		);
	} catch {
		return json({ error: "invalid_request" }, 400);
	}
}
export async function POST(
	request: Request,
	context: { params: Promise<{ action: string }> },
) {
	const action = (await context.params).action;
	if (Number(request.headers.get("content-length") ?? 0) > 16000)
		return json({ error: "request_too_large" }, 413);
	const body = await request.text();
	if (body.length > 16000) return json({ error: "request_too_large" }, 413);
	const ip =
		request.headers.get("x-vercel-forwarded-for") ??
		request.headers.get("x-forwarded-for")?.split(",")[0] ??
		"local";
	if (!(await limit(`${action}:${ip}`, action === "authorize" ? 10 : 60)))
		return json({ error: "rate_limited" }, 429);
	try {
		if (action === "register") {
			const data = z
				.object({
					client_name: z.string().max(160).default("MCP client"),
					redirect_uris: z
						.array(z.string().max(2000).refine(validRedirect))
						.min(1)
						.max(10),
					token_endpoint_auth_method: z.literal("none").optional(),
				})
				.parse(JSON.parse(body));
			const id = randomToken();
			await getDb().insert(oauthClients).values({
				id,
				name: data.client_name,
				redirectUris: data.redirect_uris,
			});
			return json(
				{
					client_id: id,
					client_name: data.client_name,
					redirect_uris: data.redirect_uris,
					token_endpoint_auth_method: "none",
					grant_types: ["authorization_code", "refresh_token"],
					response_types: ["code"],
				},
				201,
			);
		}
		const form = new URLSearchParams(body);
		if (action === "token") return json(await exchange(form));
		if (action === "revoke") {
			const token = form.get("token");
			if (token)
				await getDb()
					.delete(oauthGrants)
					.where(eq(oauthGrants.hash, hash(token)));
			return json({});
		}
		if (action === "authorize") {
			const secret = signingSecret();
			if (!secret || secret.length < 24)
				return json(
					{
						error:
							"Owner password must be configured with at least 24 characters.",
					},
					503,
				);
			if (request.headers.get("origin") !== issuer())
				return json({ error: "invalid_origin" }, 403);
			const signed = verifyConsent(form.get("consent") ?? "", secret);
			const cookie = request.headers
				.get("cookie")
				?.split(";")
				.map((s) => s.trim())
				.find((s) => s.startsWith("lists_consent="))
				?.slice(14);
			if (
				!signed ||
				typeof signed.query !== "string" ||
				typeof signed.csrf !== "string" ||
				!cookie ||
				!equalSecret(hash(cookie), signed.csrf)
			)
				return json(
					{ error: "Expired sign-in form. Start again from your MCP client." },
					400,
				);
			if (!equalSecret(form.get("password") ?? "", secret))
				return json(
					{ error: "Incorrect password. Start again from your MCP client." },
					403,
				);
			const target = await issueCode(
				await authorization(new URLSearchParams(signed.query)),
			);
			return new Response(null, {
				status: 303,
				headers: {
					...secureHeaders,
					Location: target.toString(),
					"Set-Cookie":
						"lists_consent=; HttpOnly; SameSite=Lax; Path=/api/lists/oauth; Max-Age=0",
				},
			});
		}
		return json({ error: "not_found" }, 404);
	} catch {
		return json(
			{ error: action === "token" ? "invalid_grant" : "invalid_request" },
			400,
		);
	}
}
export async function OPTIONS() {
	return new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
		},
	});
}
