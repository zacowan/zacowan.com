export type FeedFilters = { query: string; types: string[] };
export type FeedSearchParams = {
	q?: string | string[];
	type?: string | string[];
};
export function feedFilters(params: FeedSearchParams): FeedFilters {
	const query =
		(Array.isArray(params.q) ? params.q[0] : params.q)?.trim().slice(0, 200) ??
		"";
	const rawTypes = Array.isArray(params.type)
		? params.type
		: params.type
			? [params.type]
			: [];
	return {
		query,
		types: [
			...new Set(
				rawTypes.filter(
					(type) =>
						type.length <= 80 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(type),
				),
			),
		].slice(0, 30),
	};
}
export function searchPattern(query: string) {
	return `%${query.replace(/[\\%_]/g, "\\$&")}%`;
}
export function feedSearchParams(params: URLSearchParams): FeedSearchParams {
	return { q: params.get("q") ?? undefined, type: params.getAll("type") };
}
