import { z } from "zod";
export const listInput = z.object({
	slug: z
		.string()
		.min(1)
		.max(80)
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
	name: z.string().trim().min(1).max(160),
	description: z.string().max(4000).default(""),
});
export const entryFields = z.object({
	name: z.string().trim().min(1).max(240),
	rating: z.number().min(0).max(10).multipleOf(0.5).nullable(),
	review: z.string().max(12000),
	url: z
		.url()
		.max(2000)
		.refine((s) => ["http:", "https:"].includes(new URL(s).protocol))
		.nullable(),
	tags: z.array(z.string().trim().min(1).max(60)).max(20),
	details: z
		.record(z.string().min(1).max(60), z.string().max(500))
		.refine((v) => Object.keys(v).length <= 20),
	experiencedOn: z.iso.date().nullable(),
});
export const addEntryInput = entryFields.extend({
	listSlug: listInput.shape.slug,
	operationId: z
		.uuid()
		.describe(
			"Stable UUID for this operation; reuse on retry to prevent duplicate writes.",
		),
});
export const updateEntryInput = entryFields.partial().extend({
	id: z.uuid(),
	expectedVersion: z.number().int().positive(),
	archived: z.boolean().optional(),
	operationId: z.uuid(),
});
export function ratingLabel(rating: number | null) {
	return rating === null ? "Unrated" : `${rating / 2}/10`;
}
