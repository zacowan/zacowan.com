import { llmsText } from "@/lib/site-content";

export function GET() {
	return new Response(llmsText, {
		headers: {
			"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
			"Content-Type": "text/markdown; charset=utf-8",
		},
	});
}
