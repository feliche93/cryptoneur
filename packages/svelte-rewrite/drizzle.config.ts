import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL not set");
}

export default {
    schema: "src/lib/server/db/schema/*",
    out: "drizzle",
    driver: 'pg',
    dbCredentials: {
        connectionString
    }
} satisfies Config;