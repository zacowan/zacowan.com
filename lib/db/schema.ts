import { sql } from "drizzle-orm";
import {
	check,
	integer,
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
	index,
} from "drizzle-orm/pg-core";

export const lists = pgTable("lists", {
	id: uuid().defaultRandom().primaryKey(),
	slug: varchar({ length: 80 }).notNull().unique(),
	name: varchar({ length: 160 }).notNull(),
	description: text().notNull().default(""),
	createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
}).enableRLS();
export const entries = pgTable(
	"list_entries",
	{
		id: uuid().defaultRandom().primaryKey(),
		listId: uuid()
			.notNull()
			.references(() => lists.id),
		name: varchar({ length: 240 }).notNull(),
		rating: integer(), // Integer half-points: 17 = 8.5/10 = 4.25 stars.
		review: text().notNull().default(""),
		url: text(),
		tags: text().array().notNull().default(sql`'{}'::text[]`),
		details: jsonb().$type<Record<string, string>>().notNull().default({}),
		experiencedOn: varchar({ length: 10 }),
		archived: integer().notNull().default(0),
		version: integer().notNull().default(1),
		createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
		updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
	},
	(t) => [
		check("rating_range", sql`${t.rating} between 0 and 20`),
		index("entries_list_idx").on(t.listId),
	],
).enableRLS();
export const revisions = pgTable("list_revisions", {
	id: uuid().defaultRandom().primaryKey(),
	entryId: uuid()
		.notNull()
		.references(() => entries.id),
	operationId: uuid().notNull().unique(),
	snapshot: jsonb().$type<typeof entries.$inferSelect>().notNull(),
	createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
}).enableRLS();
export const oauthClients = pgTable("lists_oauth_clients", {
	id: text().primaryKey(),
	name: text().notNull(),
	redirectUris: text().array().notNull(),
	createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
}).enableRLS();
export const oauthGrants = pgTable("lists_oauth_grants", {
	hash: text().primaryKey(),
	kind: text().notNull(),
	clientId: text()
		.notNull()
		.references(() => oauthClients.id),
	redirectUri: text(),
	challenge: text(),
	resource: text().notNull(),
	expiresAt: timestamp({ withTimezone: true }).notNull(),
}).enableRLS();
export const rateLimits = pgTable("lists_rate_limits", {
	key: text().primaryKey(),
	count: integer().notNull().default(1),
	expiresAt: timestamp({ withTimezone: true }).notNull(),
}).enableRLS();
