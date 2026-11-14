CREATE TABLE "list_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listId" uuid NOT NULL,
	"name" varchar(240) NOT NULL,
	"rating" integer,
	"review" text DEFAULT '' NOT NULL,
	"url" text,
	"tags" text[] DEFAULT '{}'::text[] NOT NULL,
	"details" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"experiencedOn" varchar(10),
	"archived" integer DEFAULT 0 NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "rating_range" CHECK ("list_entries"."rating" between 0 and 20)
);
--> statement-breakpoint
CREATE TABLE "lists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(80) NOT NULL,
	"name" varchar(160) NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "lists_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "lists_oauth_clients" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"redirectUris" text[] NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lists_oauth_grants" (
	"hash" text PRIMARY KEY NOT NULL,
	"kind" text NOT NULL,
	"clientId" text NOT NULL,
	"redirectUri" text,
	"challenge" text,
	"resource" text NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lists_rate_limits" (
	"key" text PRIMARY KEY NOT NULL,
	"count" integer DEFAULT 1 NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "list_revisions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"entryId" uuid NOT NULL,
	"operationId" uuid NOT NULL,
	"snapshot" jsonb NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "list_revisions_operationId_unique" UNIQUE("operationId")
);
--> statement-breakpoint
ALTER TABLE "list_entries" ADD CONSTRAINT "list_entries_listId_lists_id_fk" FOREIGN KEY ("listId") REFERENCES "public"."lists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lists_oauth_grants" ADD CONSTRAINT "lists_oauth_grants_clientId_lists_oauth_clients_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."lists_oauth_clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "list_revisions" ADD CONSTRAINT "list_revisions_entryId_list_entries_id_fk" FOREIGN KEY ("entryId") REFERENCES "public"."list_entries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "entries_list_idx" ON "list_entries" USING btree ("listId");