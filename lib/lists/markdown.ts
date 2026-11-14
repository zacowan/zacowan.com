import { readList, readLists } from "./data";
import { ratingLabel } from "./validation";
const escape = (s: string) => s.replace(/[\\`*_{}\[\]()#+.!<>|~-]/g, "\\$&");
export async function listsMarkdown(
	slugs: string[],
	sort = "recent",
): Promise<string | null> {
	if (slugs.length === 0) {
		const lists = await readLists();
		return `# Lists\n\nPlaces, movies, and other things. My ratings and a few notes along the way.\n\nRated out of ten, shown as five stars.\n\n${lists.length ? lists.map((l) => `## [${escape(l.name)}](/lists/${l.slug})\n\n${escape(l.description)}\n\n${l.count} entries`).join("\n\n") : "Nothing here yet. The first list is on its way."}\n`;
	}
	if (slugs.length !== 1) return null;
	const list = await readList(slugs[0], sort);
	if (!list) return null;
	return `# ${escape(list.name)}\n\n${escape(list.description)}\n\n${list.entries.length} entries. Ratings out of ten, shown as five stars.\n\n${list.entries
		.map(
			(e) =>
				`## ${escape(e.name)}\n\n${ratingLabel(e.rating)}${e.rating === null ? "" : ` (${e.rating / 4}/5 stars)`}\n\n${e.url ? `<${e.url}>\n\n` : ""}${Object.entries(
					e.details,
				)
					.map(([k, v]) => `${escape(k)}: ${escape(v)}`)
					.join(
						"\n\n",
					)}\n\n${escape(e.review)}\n\n${[e.experiencedOn, ...e.tags.map((t) => `#${escape(t)}`)].filter(Boolean).join(" · ")}`,
		)
		.join("\n\n")}\n`;
}
