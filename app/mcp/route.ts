import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { z } from "zod";
import {
	addEntry,
	createList,
	editList,
	entryHistory,
	publicEntry,
	readList,
	readLists,
	restoreEntry,
	updateEntry,
} from "@/lib/lists/data";
import {
	addEntryInput,
	listInput,
	updateEntryInput,
} from "@/lib/lists/validation";
import { issuer, limit, resource, validAccess } from "@/lib/lists/oauth";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
function output(value: unknown) {
	return { content: [{ type: "text" as const, text: JSON.stringify(value) }] };
}
function server() {
	const mcp = new McpServer(
		{ name: "Zach Cowan's lists", version: "1.0.0" },
		{
			instructions:
				"Manage Zach's public lists. Ratings are 0–10 in half-point increments, displayed as five stars. Writes publish immediately. Never invent ratings or reviews. Read before updating; supply expectedVersion. Use a fresh operationId UUID for each intended entry edit, reusing it only for retries. Archive instead of deleting. History and restore support undo.",
		},
	);
	const read = { readOnlyHint: true, openWorldHint: false };
	const write = {
		readOnlyHint: false,
		destructiveHint: false,
		idempotentHint: true,
		openWorldHint: false,
	};
	mcp.registerTool(
		"get_lists",
		{
			description: "Read all lists and entry counts.",
			inputSchema: {},
			annotations: read,
		},
		async () => output(await readLists()),
	);
	mcp.registerTool(
		"get_list",
		{
			description:
				"Read a list and its entries with IDs and versions. Ratings are out of ten.",
			inputSchema: {
				slug: listInput.shape.slug,
				includeArchived: z.boolean().default(false),
			},
			annotations: read,
		},
		async ({ slug, includeArchived }) => {
			const list = await readList(slug, "recent", includeArchived);
			return output(
				list ? { ...list, entries: list.entries.map(publicEntry) } : null,
			);
		},
	);
	mcp.registerTool(
		"create_list",
		{
			description: "Create a list. Identical retries return the existing list.",
			inputSchema: listInput.shape,
			annotations: write,
		},
		async (args) => output(await createList(args)),
	);
	mcp.registerTool(
		"update_list",
		{
			description:
				"Update the name and description of an existing list identified by slug.",
			inputSchema: listInput.shape,
			annotations: write,
		},
		async (args) => output(await editList(args)),
	);
	mcp.registerTool(
		"add_entry",
		{
			description:
				"Add a rated or unrated entry. Supply only the owner's ratings and opinions. operationId prevents retry duplicates.",
			inputSchema: addEntryInput.shape,
			annotations: write,
		},
		async (args) => output(publicEntry(await addEntry(args))),
	);
	mcp.registerTool(
		"update_entry",
		{
			description:
				"Edit selected fields, archive (archived:true), or unarchive an entry. Read its current version first.",
			inputSchema: updateEntryInput.shape,
			annotations: write,
		},
		async (args) => output(publicEntry(await updateEntry(args))),
	);
	mcp.registerTool(
		"get_entry_history",
		{
			description:
				"Read all saved revisions, newest first, to choose a version to restore.",
			inputSchema: { id: z.uuid() },
			annotations: read,
		},
		async ({ id }) =>
			output(
				(await entryHistory(id)).map((r) => ({
					...r,
					snapshot: publicEntry(r.snapshot),
				})),
			),
	);
	mcp.registerTool(
		"restore_entry",
		{
			description:
				"Restore an earlier entry revision, creating a new revision. Requires the current entry version.",
			inputSchema: {
				id: z.uuid(),
				revisionId: z.uuid(),
				expectedVersion: z.number().int().positive(),
				operationId: z.uuid(),
			},
			annotations: write,
		},
		async (args) =>
			output(
				publicEntry(
					await restoreEntry(
						args.id,
						args.revisionId,
						args.expectedVersion,
						args.operationId,
					),
				),
			),
	);
	return mcp;
}
export async function POST(request: Request) {
	const origin = request.headers.get("origin");
	if (
		origin &&
		![issuer(), "https://chatgpt.com", "https://chat.openai.com"].includes(
			origin,
		)
	)
		return new Response("Forbidden origin", { status: 403 });
	const token = request.headers
		.get("authorization")
		?.match(/^Bearer (\S+)$/i)?.[1];
	if (!token || !(await validAccess(token)))
		return new Response("Unauthorized", {
			status: 401,
			headers: {
				"WWW-Authenticate": `Bearer resource_metadata="${issuer()}/.well-known/oauth-protected-resource/mcp", scope="lists:write"`,
				"Cache-Control": "no-store",
			},
		});
	if (!(await limit(`mcp:${token}`, 300, 60000)))
		return new Response("Rate limited", { status: 429 });
	if (Number(request.headers.get("content-length") ?? 0) > 65536)
		return new Response("Request too large", { status: 413 });
	const text = await request.text();
	if (text.length > 65536)
		return new Response("Request too large", { status: 413 });
	let parsedBody: unknown;
	try {
		parsedBody = JSON.parse(text);
	} catch {
		return Response.json({ error: "Invalid JSON" }, { status: 400 });
	}
	const mcp = server();
	const transport = new WebStandardStreamableHTTPServerTransport({
		enableJsonResponse: true,
	});
	try {
		await mcp.connect(transport);
		const response = await transport.handleRequest(request, { parsedBody });
		// JSON responses are complete before returning; no persistent server state is needed.
		response.headers.set("Cache-Control", "no-store");
		response.headers.set("Access-Control-Allow-Origin", "*");
		return response;
	} finally {
		await mcp.close();
	}
}
export async function GET() {
	return new Response("Use Streamable HTTP POST to connect your MCP client.", {
		status: 405,
		headers: {
			Allow: "POST, OPTIONS",
			"Cache-Control": "no-store",
			"WWW-Authenticate": `Bearer resource_metadata="${issuer()}/.well-known/oauth-protected-resource/mcp"`,
		},
	});
}
export async function OPTIONS() {
	return new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers":
				"Authorization, Content-Type, Accept, MCP-Protocol-Version",
			"Access-Control-Expose-Headers": "WWW-Authenticate",
		},
	});
}
