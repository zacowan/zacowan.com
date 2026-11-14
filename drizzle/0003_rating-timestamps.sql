ALTER TABLE "list_entries" ADD COLUMN "ratedAt" timestamp with time zone;
--> statement-breakpoint
-- Recover the last actual rating change from revision history. Older entries
-- without revisions fall back to their modification timestamp.
WITH events AS (
 SELECT "entryId", "createdAt", snapshot->>'rating' AS rating,
 lag(snapshot->>'rating') OVER (PARTITION BY "entryId" ORDER BY (snapshot->>'version')::integer, "createdAt", id) AS previous_rating
 FROM "list_revisions"
), last_rated AS (
 SELECT "entryId", max("createdAt") AS rated_at FROM events
 WHERE rating IS NOT NULL AND rating IS DISTINCT FROM previous_rating
 GROUP BY "entryId"
)
UPDATE "list_entries" e SET "ratedAt" = coalesce(
 (SELECT rated_at FROM last_rated WHERE "entryId" = e.id), e."updatedAt"
) WHERE e.rating IS NOT NULL;
