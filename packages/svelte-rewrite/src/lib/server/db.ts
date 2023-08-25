import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { env } from '$env/dynamic/private';

neonConfig.fetchConnectionCache = true;

const drizzleDatabaseUrl = env.DRIZZLE_DATABASE_URL;

if (!drizzleDatabaseUrl) {
    throw new Error("Missing DRIZZLE_DATABASE_URL environment variable");
}

const sql = neon(drizzleDatabaseUrl);
export const db = drizzle(sql);