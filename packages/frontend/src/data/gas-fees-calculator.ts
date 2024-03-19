import { db } from '@/lib/db'
import { currencies, transactionTypes } from '@/schema'
import { getTableColumns } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

export const getCurrencies = unstable_cache(async () => {
  const { name, sign, id, symbol } = getTableColumns(currencies)

  return await db.select({ name, sign, id, symbol }).from(currencies).orderBy(currencies.name)
})

export type TGetCurrenciesResponse = Awaited<ReturnType<typeof getCurrencies>>

export const getTransactionTypes = unstable_cache(async () => {
  const { name, id, gas } = getTableColumns(transactionTypes)
  return await db.select({ name, id, gas }).from(transactionTypes).orderBy(transactionTypes.name)
})

export type TGetTransactionTypesResponse = Awaited<ReturnType<typeof getTransactionTypes>>
