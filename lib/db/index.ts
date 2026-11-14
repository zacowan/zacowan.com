import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let db: ReturnType<typeof drizzle<typeof schema>> | undefined;
export function getDb() {
	if (!db) {
		if (!process.env.POSTGRES_URL) throw new Error("POSTGRES_URL is required");
		const client = postgres(process.env.POSTGRES_URL, {
			prepare: false,
			max: 3,
			idle_timeout: 20,
			connect_timeout: 10,
		});
		db = drizzle(client, { schema });
	}
	return db;
}
