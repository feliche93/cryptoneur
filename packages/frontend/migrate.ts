import { config } from 'dotenv'

const { drizzle } = require('drizzle-orm/postgres-js')
const { migrate } = require('drizzle-orm/postgres-js/migrator')
const postgres = require('postgres')

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
