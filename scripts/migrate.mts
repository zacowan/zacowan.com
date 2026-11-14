import nextEnv from "@next/env";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

nextEnv.loadEnvConfig(process.cwd());
const url = process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL;
if (!url) throw new Error("Database connection is required.");
const client = postgres(url, { max: 1, prepare: false });
try {
	await migrate(drizzle(client), { migrationsFolder: "./drizzle" });
	console.log("Migrations applied.");
} finally {
	await client.end();
}
