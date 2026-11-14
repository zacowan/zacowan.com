import { issuer, resource } from "@/lib/lists/oauth";
export function GET() {
	return Response.json(
		{
			resource: resource(),
			authorization_servers: [issuer()],
			scopes_supported: ["lists:write"],
			bearer_methods_supported: ["header"],
		},
		{
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Cache-Control": "no-store",
			},
		},
	);
}
