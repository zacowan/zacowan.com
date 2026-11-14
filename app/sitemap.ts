import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-content";
export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: SITE_URL, changeFrequency: "monthly", priority: 1 },
		{ url: `${SITE_URL}/lists`, changeFrequency: "weekly", priority: 0.8 },
	];
}
