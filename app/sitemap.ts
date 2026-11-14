export const dynamic = "force-dynamic";
import type { MetadataRoute } from "next";
import { readLists } from "@/lib/lists/data";
import { SITE_URL } from "@/lib/site-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const lists = await readLists();
	return [
		{ url: `${SITE_URL}/lists`, changeFrequency: "weekly", priority: 0.8 },
		...lists.map((list) => ({
			url: `${SITE_URL}/lists/${list.slug}`,
			lastModified: list.updatedAt,
		})),
		{
			url: SITE_URL,
			changeFrequency: "monthly",
			priority: 1,
		},
	];
}
