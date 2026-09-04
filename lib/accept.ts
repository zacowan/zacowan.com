const PRODUCES = ["text/html", "text/markdown"] as const;

type AcceptEntry = {
	type: string;
	q: number;
	specificity: number;
	position: number;
};

function parseQuality(parameters: string[]): number {
	for (const parameter of parameters) {
		const separator = parameter.indexOf("=");
		if (separator === -1) continue;
		const name = parameter.slice(0, separator).trim().toLowerCase();
		if (name !== "q") continue;
		const value = Number(parameter.slice(separator + 1).trim());
		return Number.isFinite(value) && value >= 0 && value <= 1 ? value : 0;
	}
	return 1;
}

function parseAccept(header: string): AcceptEntry[] {
	return header
		.split(",")
		.map((raw, position) => {
			const [rawType = "", ...parameters] = raw
				.trim()
				.split(";")
				.map((part) => part.trim());
			const type = rawType.toLowerCase();
			const specificity = type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2;
			return {
				type,
				q: parseQuality(parameters),
				specificity,
				position,
			};
		})
		.filter((entry) => entry.type.includes("/"));
}

function matches(entry: AcceptEntry, candidate: string): boolean {
	if (entry.type === "*/*") return true;
	if (entry.type.endsWith("/*")) {
		return candidate.startsWith(entry.type.slice(0, -1));
	}
	return entry.type === candidate;
}

export function preferredMediaType(
	header: string | null,
): (typeof PRODUCES)[number] | null {
	if (header === null || header.trim() === "") return PRODUCES[0];
	const entries = parseAccept(header);
	if (entries.length === 0) return PRODUCES[0];

	let bestType: (typeof PRODUCES)[number] | null = null;
	let bestQuality = -1;
	let bestPosition = Number.POSITIVE_INFINITY;

	for (const candidate of PRODUCES) {
		let matched: AcceptEntry | null = null;
		for (const entry of entries) {
			if (!matches(entry, candidate)) continue;
			if (
				matched === null ||
				entry.specificity > matched.specificity ||
				(entry.specificity === matched.specificity &&
					entry.position < matched.position)
			) {
				matched = entry;
			}
		}

		if (matched === null || matched.q <= 0) continue;
		if (
			matched.q > bestQuality ||
			(matched.q === bestQuality && matched.position < bestPosition)
		) {
			bestType = candidate;
			bestQuality = matched.q;
			bestPosition = matched.position;
		}
	}

	return bestType;
}

export function appendVary(headers: Headers, value: string): void {
	const existing = headers.get("Vary");
	if (!existing) {
		headers.set("Vary", value);
		return;
	}
	const values = existing.split(",").map((item) => item.trim().toLowerCase());
	if (!values.includes(value.toLowerCase())) {
		headers.set("Vary", `${existing}, ${value}`);
	}
}
