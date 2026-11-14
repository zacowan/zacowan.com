import { and, asc, desc, eq, getTableColumns, inArray, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { entries, lists, revisions } from "@/lib/db/schema";
import { type FeedFilters, searchPattern } from "./feed-filters";
import { addEntryInput, listInput, updateEntryInput } from "./validation";

export async function readLists() {
	return getDb()
		.select({
			id: lists.id,
			slug: lists.slug,
			name: lists.name,
			description: lists.description,
			updatedAt: lists.updatedAt,
			count: sql<number>`count(${entries.id})::int`,
		})
		.from(lists)
		.leftJoin(
			entries,
			and(eq(entries.listId, lists.id), eq(entries.archived, 0)),
		)
		.groupBy(lists.id)
		.orderBy(asc(lists.name));
}
export async function readList(
	slug: string,
	sort = "recent",
	includeArchived = false,
) {
	const [list] = await getDb().select().from(lists).where(eq(lists.slug, slug));
	if (!list) return null;
	const order =
		sort === "rating"
			? [sql`${entries.rating} desc nulls last`, asc(entries.name)]
			: sort === "name"
				? [asc(entries.name)]
				: [
						sql`${entries.ratedAt} desc nulls last`,
						desc(entries.createdAt),
						asc(entries.id),
					];
	const items = await getDb()
		.select()
		.from(entries)
		.where(
			and(
				eq(entries.listId, list.id),
				includeArchived ? undefined : eq(entries.archived, 0),
			),
		)
		.orderBy(...order);
	return { ...list, entries: items };
}
export async function createList(input: unknown) {
	const value = listInput.parse(input);
	const [list] = await getDb()
		.insert(lists)
		.values(value)
		.onConflictDoNothing({ target: lists.slug })
		.returning();
	if (list) return list;
	const [existing] = await getDb()
		.select()
		.from(lists)
		.where(eq(lists.slug, value.slug));
	if (
		existing.name !== value.name ||
		existing.description !== value.description
	)
		throw new Error("That slug already belongs to a different list.");
	return existing;
}
export async function editList(input: unknown) {
	const value = listInput.parse(input);
	const [list] = await getDb()
		.update(lists)
		.set({
			name: value.name,
			description: value.description,
			updatedAt: new Date(),
		})
		.where(eq(lists.slug, value.slug))
		.returning();
	if (!list) throw new Error("List not found.");
	return list;
}
export async function addEntry(input: unknown) {
	const { listSlug, operationId, ...value } = addEntryInput.parse(input);
	return getDb().transaction(async (tx) => {
		// Serialize matching operation IDs, including retries arriving concurrently.
		await tx.execute(
			sql`select pg_advisory_xact_lock(hashtextextended(${operationId}, 0))`,
		);
		const [prior] = await tx
			.select()
			.from(revisions)
			.where(eq(revisions.operationId, operationId));
		if (prior) return prior.snapshot;
		const [list] = await tx
			.select()
			.from(lists)
			.where(eq(lists.slug, listSlug));
		if (!list) throw new Error("List not found. Create it first.");
		const [entry] = await tx
			.insert(entries)
			.values({
				...value,
				rating: value.rating === null ? null : value.rating * 2,
				ratedAt: value.rating === null ? null : new Date(),
				listId: list.id,
			})
			.returning();
		await tx
			.insert(revisions)
			.values({ entryId: entry.id, operationId, snapshot: entry });
		await tx
			.update(lists)
			.set({ updatedAt: new Date() })
			.where(eq(lists.id, list.id));
		return entry;
	});
}
export async function updateEntry(input: unknown) {
	const { id, expectedVersion, operationId, rating, archived, ...value } =
		updateEntryInput.parse(input);
	return getDb().transaction(async (tx) => {
		await tx.execute(
			sql`select pg_advisory_xact_lock(hashtextextended(${operationId}, 0))`,
		);
		const [prior] = await tx
			.select()
			.from(revisions)
			.where(eq(revisions.operationId, operationId));
		if (prior) {
			if (prior.entryId !== id)
				throw new Error("Operation ID already used for another entry.");
			return prior.snapshot;
		}
		const [entry] = await tx
			.update(entries)
			.set({
				...value,
				...(rating === undefined
					? {}
					: { rating: rating === null ? null : rating * 2 }),
				...(rating === undefined
					? {}
					: {
							ratedAt:
								rating === null
									? null
									: sql`case when ${entries.rating} is distinct from ${rating * 2} then now() else ${entries.ratedAt} end`,
						}),
				...(archived === undefined ? {} : { archived: archived ? 1 : 0 }),
				version: expectedVersion + 1,
				updatedAt: new Date(),
			})
			.where(and(eq(entries.id, id), eq(entries.version, expectedVersion)))
			.returning();
		if (!entry)
			throw new Error(
				"Entry missing or changed. Read the list again and use its current version.",
			);
		await tx
			.insert(revisions)
			.values({ entryId: id, operationId, snapshot: entry });
		await tx
			.update(lists)
			.set({ updatedAt: new Date() })
			.where(eq(lists.id, entry.listId));
		return entry;
	});
}
export async function entryHistory(id: string) {
	return getDb()
		.select()
		.from(revisions)
		.where(eq(revisions.entryId, id))
		.orderBy(desc(revisions.createdAt));
}
export async function restoreEntry(
	id: string,
	revisionId: string,
	expectedVersion: number,
	operationId: string,
) {
	const [revision] = await getDb()
		.select()
		.from(revisions)
		.where(and(eq(revisions.id, revisionId), eq(revisions.entryId, id)));
	if (!revision) throw new Error("Revision not found.");
	const s = revision.snapshot;
	return updateEntry({
		id,
		expectedVersion,
		operationId,
		name: s.name,
		rating: s.rating === null ? null : s.rating / 2,
		review: s.review,
		url: s.url,
		tags: s.tags,
		details: s.details,
		experiencedOn: s.experiencedOn,
		archived: Boolean(s.archived),
	});
}
// Tool/API responses always express ratings on the public 0–10 scale.
export function publicEntry<T extends { rating: number | null }>(entry: T) {
	return { ...entry, rating: entry.rating === null ? null : entry.rating / 2 };
}

export async function readFeed({ query, types }: FeedFilters) {
	return getDb()
		.select({
			...getTableColumns(entries),
			listName: lists.name,
			listSlug: lists.slug,
		})
		.from(entries)
		.innerJoin(lists, eq(entries.listId, lists.id))
		.where(
			and(
				eq(entries.archived, 0),
				types.length ? inArray(lists.slug, types) : undefined,
				query
					? sql`concat_ws(' ', ${entries.name}, ${entries.review}, array_to_string(${entries.tags}, ' '), ${entries.details}::text, ${lists.name}) ilike ${searchPattern(query)}`
					: undefined,
			),
		)
		.orderBy(
			sql`${entries.ratedAt} desc nulls last`,
			desc(entries.createdAt),
			asc(entries.id),
		);
}
