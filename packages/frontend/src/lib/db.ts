import { Pool } from '@neondatabase/serverless'
import { SQL, asc, count, desc } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/neon-serverless'
import { PgColumn, PgSelect } from 'drizzle-orm/pg-core'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

const pool = new Pool({ connectionString })
export const db = drizzle(pool)

export async function withPagination<T extends PgSelect>(
  qb: T,
  page: number,
  per_page: number = 10,
) {
  const offset = (page - 1) * per_page

  // First, create a subquery for counting
  const countSubQuery = qb.as('count_subquery')

  // Prepare both queries to run in parallel
  const totalRowsPromise = db
    .select({
      count: count(),
    })
    .from(countSubQuery)

  const dataPromise = qb.limit(per_page).offset(offset)

  // Execute both queries in parallel
  const [totalRowsResult, data] = await Promise.all([totalRowsPromise, dataPromise])

  const totalRows = totalRowsResult[0]?.count || 0
  const pageCount = Math.ceil(totalRows / per_page)

  return {
    data,
    pageCount,
  }
}

// https://discord.com/channels/1043890932593987624/1174371221153009726/1174371221153009726
export function withOrderBy<T extends PgSelect>(
  qb: T,
  {
    order = 'asc',
    orderBy,
    sortMap,
    nullsLast = true,
  }: {
    order?: 'asc' | 'desc'
    orderBy?: string
    sortMap: Record<string, PgColumn | SQL | SQL.Aliased> & Record<'default', PgColumn | SQL>
    nullsLast?: boolean
  },
) {
  const sortOrder = order === 'asc' ? asc : desc

  const orderBySql = orderBy ? sortMap[orderBy] || sortMap.default : sortMap.default

  return qb.orderBy(
    sortOrder(orderBySql),
    // .append(
    //   sql.raw(`nulls ${nullsLast ? "last" : "first"}`)
    // )
  )
}

export function withTableFeatures<T extends PgSelect>(
  qb: T,
  {
    page,
    per_page,
    order,
    sortMap,
    orderBy,
    nullsLast,
  }: {
    page: number
    per_page: number
    order?: 'asc' | 'desc'
    orderBy?: string
    sortMap: Record<string, PgColumn | SQL | SQL.Aliased> & Record<'default', PgColumn | SQL>
    nullsLast?: boolean
  },
) {
  const orderedQuery = withOrderBy(qb, {
    order,
    sortMap,
    orderBy,
    nullsLast,
  })

  return withPagination(orderedQuery, page, per_page)
}
