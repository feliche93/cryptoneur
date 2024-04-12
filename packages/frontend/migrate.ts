import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

config({
  path: './.env.local',
})

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined')
}

const sql = postgres(connectionString, { max: 1 })
const db = drizzle(sql)

;(async () => {
  try {
    await migrate(db, { migrationsFolder: 'drizzle' })
  } finally {
    await sql.end()
  }
})()
