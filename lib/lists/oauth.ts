import { and, eq, gt, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { oauthClients, oauthGrants, rateLimits } from "@/lib/db/schema";
import { SITE_URL } from "@/lib/site-content";
import { challengeFor, hash, randomToken } from "./crypto";

export function issuer() {
	return process.env.LISTS_OAUTH_ISSUER ?? SITE_URL;
}
export function resource() {
	return `${issuer()}/mcp`;
}
export async function limit(key: string, maximum: number, windowMs = 600000) {
	const now = new Date();
	const [row] = await getDb()
		.insert(rateLimits)
		.values({
			key: hash(key),
			count: 1,
			expiresAt: new Date(now.getTime() + windowMs),
		})
		.onConflictDoUpdate({
			target: rateLimits.key,
			set: {
				count: sql`case when ${rateLimits.expiresAt} < ${now} then 1 else ${rateLimits.count} + 1 end`,
				expiresAt: sql`case when ${rateLimits.expiresAt} < ${now} then ${new Date(now.getTime() + windowMs)} else ${rateLimits.expiresAt} end`,
			},
		})
		.returning();
	return row.count <= maximum;
}
export async function authorization(input: URLSearchParams) {
	const clientId = input.get("client_id");
	const redirectUri = input.get("redirect_uri");
	const challenge = input.get("code_challenge");
	if (
		!clientId ||
		!redirectUri ||
		!challenge ||
		!/^[A-Za-z0-9_-]{43}$/.test(challenge) ||
		input.get("code_challenge_method") !== "S256" ||
		input.get("response_type") !== "code"
	)
		throw new Error("Invalid authorization request. PKCE S256 is required.");
	const scope = input.get("scope") ?? "lists:write";
	if (scope !== "lists:write") throw new Error("Unsupported scope.");
	if (input.get("resource") && input.get("resource") !== resource())
		throw new Error("Invalid resource.");
	const [client] = await getDb()
		.select()
		.from(oauthClients)
		.where(eq(oauthClients.id, clientId));
	if (!client || !client.redirectUris.includes(redirectUri))
		throw new Error("Unregistered client or redirect URI.");
	return {
		clientId,
		redirectUri,
		challenge,
		state: input.get("state") ?? "",
		resource: resource(),
		clientName: client.name,
	};
}
export async function issueCode(
	request: Awaited<ReturnType<typeof authorization>>,
) {
	const code = randomToken();
	await getDb()
		.insert(oauthGrants)
		.values({
			hash: hash(code),
			kind: "code",
			clientId: request.clientId,
			redirectUri: request.redirectUri,
			challenge: request.challenge,
			resource: request.resource,
			expiresAt: new Date(Date.now() + 300000),
		});
	const target = new URL(request.redirectUri);
	target.searchParams.set("code", code);
	if (request.state) target.searchParams.set("state", request.state);
	return target;
}
export async function exchange(form: URLSearchParams) {
	const clientId = form.get("client_id");
	const kind = form.get("grant_type");
	const raw =
		kind === "authorization_code"
			? form.get("code")
			: kind === "refresh_token"
				? form.get("refresh_token")
				: null;
	if (!raw || !clientId) throw new Error("Invalid grant.");
	const token = randomToken(),
		refresh = randomToken();
	await getDb().transaction(async (tx) => {
		const [grant] = await tx
			.select()
			.from(oauthGrants)
			.where(
				and(
					eq(oauthGrants.hash, hash(raw)),
					gt(oauthGrants.expiresAt, new Date()),
				),
			)
			.for("update");
		if (
			!grant ||
			grant.clientId !== clientId ||
			grant.resource !== resource() ||
			(form.get("resource") && form.get("resource") !== resource())
		)
			throw new Error("Invalid grant.");
		if (kind === "authorization_code") {
			const verifier = form.get("code_verifier") ?? "";
			if (
				grant.kind !== "code" ||
				grant.redirectUri !== form.get("redirect_uri") ||
				!/^[A-Za-z0-9._~-]{43,128}$/.test(verifier) ||
				challengeFor(verifier) !== grant.challenge
			)
				throw new Error("Invalid grant.");
		} else if (grant.kind !== "refresh") throw new Error("Invalid grant.");
		await tx.delete(oauthGrants).where(eq(oauthGrants.hash, grant.hash));
		await tx.insert(oauthGrants).values([
			{
				hash: hash(token),
				kind: "access",
				clientId,
				resource: resource(),
				expiresAt: new Date(Date.now() + 3600000),
			},
			{
				hash: hash(refresh),
				kind: "refresh",
				clientId,
				resource: resource(),
				expiresAt: new Date(Date.now() + 30 * 86400000),
			},
		]);
	});
	return {
		access_token: token,
		refresh_token: refresh,
		token_type: "Bearer",
		expires_in: 3600,
		scope: "lists:write",
	};
}
export async function validAccess(raw: string) {
	const [grant] = await getDb()
		.select({ hash: oauthGrants.hash })
		.from(oauthGrants)
		.where(
			and(
				eq(oauthGrants.hash, hash(raw)),
				eq(oauthGrants.kind, "access"),
				eq(oauthGrants.resource, resource()),
				gt(oauthGrants.expiresAt, new Date()),
			),
		);
	return Boolean(grant);
}
