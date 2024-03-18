import type { Config } from 'drizzle-kit'

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle',
  dbCredentials: {
    connectionString: process.env.DIRECT_URL || '',
  },
  driver: 'pg',
} satisfies Config
