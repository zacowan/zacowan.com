import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { appendVary, preferredMediaType } from "@/lib/accept";

const MARKDOWN_ALTERNATE =
	'</index.md>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"';

function decorate(response: NextResponse, pathname: string): NextResponse {
	appendVary(response.headers, "Accept");
	if (pathname === "/" || pathname === "/index.md") {
		response.headers.set("Link", MARKDOWN_ALTERNATE);
	}
	return response;
}

export function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	if (pathname.endsWith(".md")) {
		const url = request.nextUrl.clone();
		const sourcePath = pathname === "/index.md" ? "/" : pathname.slice(0, -3);
		url.pathname = `/api/markdown${sourcePath}`;
		return decorate(NextResponse.rewrite(url), pathname);
	}

	const accept = request.headers.get("accept");
	const preferred = preferredMediaType(accept);
	if (preferred === "text/markdown") {
		const url = request.nextUrl.clone();
		url.pathname = `/api/markdown${pathname}`;
		return decorate(NextResponse.rewrite(url), pathname);
	}

	if (preferred === null && accept) {
		return new NextResponse(
			"Not Acceptable\n\nAvailable representations:\n- text/html\n- text/markdown\n",
			{
				status: 406,
				headers: {
					"Cache-Control": "no-store",
					"Content-Type": "text/plain; charset=utf-8",
					Vary: "Accept",
				},
			},
		);
	}

	return decorate(NextResponse.next(), pathname);
}

export const config = {
	matcher: [
		"/((?!api/|_next/|_vercel/|icon\\.png|opengraph-image|twitter-image|robots\\.txt|sitemap\\.xml|llms\\.txt).*)",
	],
};
