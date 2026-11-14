import { readFeed, readLists } from "./data";
import type { FeedFilters } from "./feed-filters";
import { ratingLabel } from "./validation";

const escapeMarkdown = (s: string) =>
	s.replace(/[\\`*_{}[\]()#+.!<>|~-]/g, "\\$&");
export async function listsMarkdown(filters: FeedFilters): Promise<string> {
	const [items, types] = await Promise.all([readFeed(filters), readLists()]);
	return `# Lists\n\nPlaces, movies, and other things I've rated.\n\n${items.length} entries. Most recently rated first; unrated entries follow.\n\n${filters.query ? `Search: ${escapeMarkdown(filters.query)}\n\n` : ""}${filters.types.length ? `List types: ${filters.types.map(escapeMarkdown).join(", ")}\n\n` : ""}Filter by type: [All types](/lists)${types.map((type) => ` · [${escapeMarkdown(type.name)}](/lists?type=${type.slug})`).join("")}\n\n${
		items.length
			? items
					.map(
						(entry) =>
							`## ${escapeMarkdown(entry.name)}\n\n${escapeMarkdown(entry.listName)} · ${ratingLabel(entry.rating)}${entry.rating === null ? "" : ` (${entry.rating / 4}/5 stars)`}${entry.ratedAt ? ` · Rated ${entry.ratedAt.toISOString().slice(0, 10)}` : ""}\n\n${entry.url ? `<${entry.url}>\n\n` : ""}${Object.entries(
								entry.details,
							)
								.map(
									([key, value]) =>
										`${escapeMarkdown(key)}: ${escapeMarkdown(value)}`,
								)
								.join(
									"\n\n",
								)}\n\n${escapeMarkdown(entry.review)}\n\n${[entry.experiencedOn ? `Experienced ${entry.experiencedOn}` : "", ...entry.tags.map((tag) => `#${escapeMarkdown(tag)}`)].filter(Boolean).join(" · ")}`,
					)
					.join("\n\n")
			: filters.query || filters.types.length
				? "No entries match your search and filters."
				: "No ratings yet. Check back soon."
	}\n`;
}
