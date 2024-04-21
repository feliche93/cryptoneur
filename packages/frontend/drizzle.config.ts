import { config } from 'dotenv'
import type { Config } from 'drizzle-kit'

config({
  path: './.env.local',
})

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable not found')
}

export default {
  schema: './src/schema.ts',
  out: './drizzle',
  dbCredentials: {
    connectionString,
  },
  driver: 'pg',
} satisfies Config
