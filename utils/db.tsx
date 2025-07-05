import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from './Schema'

config({ path: ".env.local" }); // or .env.local

const sql = neon(process.env.DRIZZLE_DB_URL!);
export const db = drizzle({ client: sql, schema});
