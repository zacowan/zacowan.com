import {
	homepageMarkdown,
	notFoundMarkdown,
	SITE_URL,
} from "@/lib/site-content";

const alternateLinks =
	`<${SITE_URL}/index.md>; rel="alternate"; type="text/markdown", ` +
	`<${SITE_URL}/llms.txt>; rel="describedby"`;

function markdownResponse(body: string, status = 200): Response {
	return new Response(body, {
		status,
		headers: {
			"Cache-Control":
				status === 200
					? "public, s-maxage=300, stale-while-revalidate=86400"
					: "no-store",
			"Content-Type": "text/markdown; charset=utf-8",
			Link: alternateLinks,
			Vary: "Accept, Accept-Encoding",
		},
	});
}

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ slug?: string[] }> },
) {
	const { slug = [] } = await params;
	return slug.length === 0
		? markdownResponse(homepageMarkdown)
		: markdownResponse(notFoundMarkdown, 404);
}
