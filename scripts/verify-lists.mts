// Run explicitly against a provisioned database, after db:migrate. Never seeds opinions.
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { eq, inArray, sql } from "drizzle-orm";
import { renderToStaticMarkup } from "react-dom/server";
import {
	GET as authorize,
	POST as oauth,
} from "../app/api/lists/oauth/[action]/route";
import ListsPage from "../app/lists/page";
import { POST as mcp } from "../app/mcp/route";
import { getDb } from "../lib/db/index";
import {
	entries,
	lists,
	oauthClients,
	oauthGrants,
	revisions,
} from "../lib/db/schema";
import { challengeFor, randomToken } from "../lib/lists/crypto";
import {
	addEntry,
	createList,
	entryHistory,
	publicEntry,
	readFeed,
	readList,
	restoreEntry,
	updateEntry,
} from "../lib/lists/data";
import { listsMarkdown } from "../lib/lists/markdown";
import { validAccess } from "../lib/lists/oauth";

const base = "https://zacowan.com";
const verificationIp = `verify-${randomUUID()}`;
process.env.LISTS_OAUTH_ISSUER = base;
process.env.LISTS_OWNER_PASSWORD = randomToken();
const slug = `verify-${randomUUID()}`;
const db = getDb();
let listId: string | undefined;
let clientId: string | undefined;
const ctx = (action: string) => ({ params: Promise.resolve({ action }) });
const post = (
	action: string,
	body: object | URLSearchParams,
	headers: Record<string, string> = {},
) =>
	oauth(
		new Request(`${base}/api/lists/oauth/${action}`, {
			method: "POST",
			headers: {
				"x-vercel-forwarded-for": verificationIp,
				"content-type":
					body instanceof URLSearchParams
						? "application/x-www-form-urlencoded"
						: "application/json",
				...headers,
			},
			body: body instanceof URLSearchParams ? body : JSON.stringify(body),
		}),
		ctx(action),
	);
try {
	const list = await createList({
		slug,
		name: "Temporary verification",
		description: "Removed after verification.",
	});
	listId = list.id;
	const input = {
		listSlug: slug,
		name: "Temporary entry",
		rating: 8.5,
		review: "Verification only.",
		url: "https://example.com",
		tags: ["test"],
		details: { year: "2026" },
		experiencedOn: "2026-11-14",
		operationId: randomUUID(),
	};
	const [entry, retry] = await Promise.all([addEntry(input), addEntry(input)]);
	assert.equal(entry.id, retry.id);
	assert.equal(publicEntry(entry).rating, 8.5);
	assert.equal((await readList(slug))?.entries.length, 1);
	await assert.rejects(
		updateEntry({
			id: entry.id,
			expectedVersion: 99,
			rating: 3,
			operationId: randomUUID(),
		}),
	);
	const updated = await updateEntry({
		id: entry.id,
		expectedVersion: 1,
		rating: 9,
		archived: true,
		operationId: randomUUID(),
	});
	assert.equal(updated.version, 2);
	assert.equal((await readList(slug))?.entries.length, 0);
	const history = await entryHistory(entry.id);
	const initial = history.find((r) => r.snapshot.version === 1);
	assert.ok(initial);
	const restored = await restoreEntry(entry.id, initial.id, 2, randomUUID());
	assert.equal(restored.rating, 17);
	assert.equal(restored.archived, 0);
	await db.transaction(async (tx) => {
		await tx.execute(sql`set local role anon`);
		const result = await tx.execute(sql`select id from list_entries`);
		assert.equal(result.length, 0);
	});
	const badRegister = await post("register", {
		redirect_uris: ["http://example.com"],
	});
	assert.equal(badRegister.status, 400);
	const registration = await post("register", {
		client_name: "Temporary verification",
		redirect_uris: ["https://example.com/callback"],
	});
	assert.equal(registration.status, 201);
	const client = await registration.json();
	clientId = client.client_id;
	const verifier = randomToken() + randomToken();
	const query = new URLSearchParams({
		client_id: clientId as string,
		redirect_uri: "https://example.com/callback",
		response_type: "code",
		code_challenge: challengeFor(verifier),
		code_challenge_method: "S256",
		scope: "lists:write",
		state: "state-test",
		resource: `${base}/mcp`,
	});
	const consentPage = await authorize(
		new Request(`${base}/api/lists/oauth/authorize?${query}`),
		ctx("authorize"),
	);
	assert.equal(consentPage.status, 200);
	const cookie = consentPage.headers.get("set-cookie")?.split(";")[0];
	assert.ok(cookie);
	const html = await consentPage.text();
	const consent = html.match(/name="consent" value="([^"]+)"/)?.[1];
	assert.ok(consent);
	const form = new URLSearchParams({
		consent,
		password: process.env.LISTS_OWNER_PASSWORD,
	});
	assert.equal((await post("authorize", form)).status, 403);
	const approval = await post("authorize", form, { origin: base, cookie });
	assert.equal(approval.status, 303);
	const callback = new URL(approval.headers.get("location") as string);
	assert.equal(callback.searchParams.get("state"), "state-test");
	const tokenForm = new URLSearchParams({
		grant_type: "authorization_code",
		client_id: clientId as string,
		redirect_uri: "https://example.com/callback",
		code: callback.searchParams.get("code") as string,
		code_verifier: verifier,
		resource: `${base}/mcp`,
	});
	const wrongVerifier = new URLSearchParams(tokenForm);
	wrongVerifier.set("code_verifier", randomToken() + randomToken());
	assert.equal((await post("token", wrongVerifier)).status, 400);
	const tokensResponse = await post("token", tokenForm);
	assert.equal(tokensResponse.status, 200);
	const tokens = await tokensResponse.json();
	assert.ok(await validAccess(tokens.access_token));
	assert.equal((await post("token", tokenForm)).status, 400);
	const mcpRequest = (
		token: string | null,
		method: string,
		params: unknown = {},
	) =>
		new Request(`${base}/mcp`, {
			method: "POST",
			headers: {
				"x-vercel-forwarded-for": verificationIp,
				"content-type": "application/json",
				accept: "application/json, text/event-stream",
				...(token ? { authorization: `Bearer ${token}` } : {}),
			},
			body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
		});
	assert.equal((await mcp(mcpRequest(null, "tools/list"))).status, 401);
	const toolsResponse = await mcp(
		mcpRequest(tokens.access_token, "tools/list"),
	);
	assert.equal(toolsResponse.status, 200);
	const tools = await toolsResponse.json();
	assert.equal(tools.result.tools.length, 8);
	const editResponse = await mcp(
		mcpRequest(tokens.access_token, "tools/call", {
			name: "update_entry",
			arguments: {
				id: entry.id,
				expectedVersion: 3,
				rating: 7.5,
				operationId: randomUUID(),
			},
		}),
	);
	const editResult = await editResponse.json();
	assert.ok(!editResult.result.isError, "MCP edit must succeed");
	assert.equal(JSON.parse(editResult.result.content[0].text).rating, 7.5);
	assert.equal((await readList(slug))?.entries[0].rating, 15);
	const refresh = await post(
		"token",
		new URLSearchParams({
			grant_type: "refresh_token",
			client_id: clientId as string,
			refresh_token: tokens.refresh_token,
		}),
	);
	assert.equal(refresh.status, 200);
	assert.equal(
		(
			await post(
				"token",
				new URLSearchParams({
					grant_type: "refresh_token",
					client_id: clientId as string,
					refresh_token: tokens.refresh_token,
				}),
			)
		).status,
		400,
	);
	await post("revoke", new URLSearchParams({ token: tokens.access_token }));
	assert.equal(await validAccess(tokens.access_token), false);
	const other = await addEntry({
		...input,
		name: "Literal 100%_ match",
		rating: 9,
		review: "",
		tags: [],
		details: {},
		operationId: randomUUID(),
	});
	await db
		.update(entries)
		.set({ ratedAt: new Date("2000-01-01T00:00:00Z") })
		.where(eq(entries.id, entry.id));
	await db
		.update(entries)
		.set({ ratedAt: new Date("2001-01-01T00:00:00Z") })
		.where(eq(entries.id, other.id));
	const filter = { query: "", types: [slug] };
	assert.equal((await readFeed(filter))[0].id, other.id);
	const noteEdit = await updateEntry({
		id: entry.id,
		expectedVersion: 4,
		review: "Changed only a note",
		operationId: randomUUID(),
	});
	assert.equal(noteEdit.ratedAt?.toISOString(), "2000-01-01T00:00:00.000Z");
	const sameRating = await updateEntry({
		id: entry.id,
		expectedVersion: 5,
		rating: 7.5,
		operationId: randomUUID(),
	});
	assert.equal(sameRating.ratedAt?.toISOString(), "2000-01-01T00:00:00.000Z");
	assert.equal((await readFeed(filter))[0].id, other.id);
	const rerated = await updateEntry({
		id: entry.id,
		expectedVersion: 6,
		rating: 8,
		operationId: randomUUID(),
	});
	assert.ok(rerated.ratedAt && rerated.ratedAt.getFullYear() > 2001);
	assert.equal((await readFeed(filter))[0].id, entry.id);
	assert.deepEqual(
		(await readFeed({ query: "100%_", types: [slug] })).map((e) => e.id),
		[other.id],
	);
	assert.deepEqual(
		(await readFeed({ query: "CHANGED ONLY A NOTE", types: [slug] })).map(
			(e) => e.id,
		),
		[entry.id],
	);
	assert.equal(
		(await readFeed({ query: "Temporary", types: [`missing-${randomUUID()}`] }))
			.length,
		0,
	);
	await updateEntry({
		id: entry.id,
		expectedVersion: 7,
		rating: null,
		operationId: randomUUID(),
	});
	const finalFeed = await readFeed(filter);
	assert.equal(finalFeed[0].id, other.id);
	assert.equal(finalFeed[1].ratedAt, null);

	const htmlFeed = renderToStaticMarkup(
		await ListsPage({
			searchParams: Promise.resolve({ q: "100%_", type: slug }),
		}),
	);
	assert.ok(htmlFeed.includes("Literal 100%_ match"));
	assert.ok(!htmlFeed.includes("Temporary entry"));
	assert.ok(htmlFeed.includes('method="get"'));
	assert.ok(htmlFeed.includes("4.5 out of 5 stars"));
	const markdownFeed = await listsMarkdown({ query: "100%_", types: [slug] });
	assert.ok(markdownFeed.includes("Literal 100%"));
	assert.ok(!markdownFeed.includes("Temporary entry"));

	console.log(
		"Verified: real Postgres CRUD, concurrent retries, version conflicts, archive/restore, RLS, OAuth consent/CSRF/PKCE/replay/refresh/revocation, authenticated MCP writes; flat-feed search/type filters and rating timestamps (note edits and identical ratings do not reorder entries).",
	);
} finally {
	if (listId) {
		const ids = (
			await db
				.select({ id: entries.id })
				.from(entries)
				.where(eq(entries.listId, listId))
		).map((e) => e.id);
		if (ids.length)
			await db.delete(revisions).where(inArray(revisions.entryId, ids));
		await db.delete(entries).where(eq(entries.listId, listId));
		await db.delete(lists).where(eq(lists.id, listId));
	}
	if (clientId) {
		await db.delete(oauthGrants).where(eq(oauthGrants.clientId, clientId));
		await db.delete(oauthClients).where(eq(oauthClients.id, clientId));
	}
}
process.exit(0);
