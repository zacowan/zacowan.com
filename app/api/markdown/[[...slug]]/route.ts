import { readLists } from "@/lib/lists/data";
import { feedFilters, feedSearchParams } from "@/lib/lists/feed-filters";
import { listsMarkdown } from "@/lib/lists/markdown";
import {
	homepageMarkdown,
	notFoundMarkdown,
	SITE_URL,
} from "@/lib/site-content";

function markdownResponse(
	body: string,
	status = 200,
	live = false,
	alternate = "/index.md",
): Response {
	return new Response(body, {
		status,
		headers: {
			"Cache-Control":
				status === 200 && !live
					? "public, s-maxage=300, stale-while-revalidate=86400"
					: "no-store",
			"Content-Type": "text/markdown; charset=utf-8",
			Link: `<${SITE_URL}${alternate}>; rel="alternate"; type="text/markdown", <${SITE_URL}/llms.txt>; rel="describedby"`,
			Vary: "Accept, Accept-Encoding",
		},
	});
}
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ slug?: string[] }> },
) {
	const { slug = [] } = await params;
	const url = new URL(request.url);
	if (slug[0] === "lists") {
		if (slug.length === 1)
			return markdownResponse(
				await listsMarkdown(feedFilters(feedSearchParams(url.searchParams))),
				200,
				true,
				`/lists.md${url.search}`,
			);
		if (
			slug.length === 2 &&
			(await readLists()).some((list) => list.slug === slug[1])
		) {
			const target = new URL("/lists.md", url);
			target.searchParams.set("type", slug[1]);
			if (url.searchParams.get("q"))
				target.searchParams.set("q", url.searchParams.get("q") as string);
			return new Response(null, {
				status: 308,
				headers: { Location: target.toString(), Vary: "Accept" },
			});
		}
		return markdownResponse(notFoundMarkdown, 404, true);
	}
	return slug.length === 0
		? markdownResponse(homepageMarkdown)
		: markdownResponse(notFoundMarkdown, 404);
}
