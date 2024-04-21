import { db, withPagination } from '@/lib/db'
import { STableSearchParams } from '@/models/data-table'
import {
  fiatCurrencies,
  grantBlockchains,
  grantCategories,
  grantUseCases,
  grants,
  organizations,
} from '@/schema'
import { SQL, asc, desc, eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { getCachedBlockchainOptions } from './blockchains'
import { getCachedCategoriesOptions } from './categories'
import { getCachedUseCasesOptions } from './use-cases'

export const SGetGrantsParams = z
  .object({
    grantId: z.string().optional(),
    grantName: z
      .string()
      .optional()
      .transform((v) => {
        if (!v) return undefined
        return `%${v}%`
      }),
    // userId: sUserId,
    // websiteUrl: z
    //   .string()
    //   .optional()
    //   .transform((v) => {
    //     if (!v) return undefined
    //     return `%${v}%`
    //   }),
    // backlinkProspectCount: z
    //   .string()
    //   .or(z.array(z.string()))
    //   .optional()
    //   .transform((v) => {
    //     if (!v) return undefined
    //     if (Array.isArray(v)) return v
    //     return v.split('.')
    //   }),
  })
  .merge(STableSearchParams)

export type TGetGrantsParams = z.infer<typeof SGetGrantsParams>

export const getGrants = async (params: TGetGrantsParams) => {
  const parsedParams = SGetGrantsParams.parse(params)

  // Split the sort parameter into column and order
  const [column, order] = parsedParams.sort?.split('.') ?? []
  const sortOrder = order === 'desc' ? desc : asc

  // Define a mapping for your sort columns to actual SQL expressions or column names
  const sortMap = {
    default: grants.name,
    grantFundingAmountMin: grants.fundingAmountMin,
    grantFundingAmountMax: grants.fundingAmountMax,
    grantOrganizationName: organizations.name,
    grantName: grants.name,
    // websiteUrl: websites.url,
    // campaignTypeName: campaignTypes.name,
    // campaignCreatedAt: campaigns.createdAt,
  }

  // Determine the SQL expression or column name to use for sorting
  const orderBySql = column
    ? sortMap[column as keyof typeof sortMap] || sortMap.default
    : sortMap.default

  const orders: SQL<unknown>[] = [sortOrder(orderBySql).append(sql.raw(` NULLS LAST`))]

  const grantBlockchainsSubquery = db
    .select({
      grantId: grantBlockchains.grantId,
      blockchainIds: sql<string[]>`array_agg(${grantBlockchains.blockchainId})`.as('blockchainIds'),
    })
    .from(grantBlockchains)
    .groupBy(grantBlockchains.grantId)
    .as('grantBlockchainsSubquery')

  const grantUseCasesSubquery = db
    .select({
      grantId: grantUseCases.grantId,
      useCaseIds: sql<string[]>`array_agg(${grantUseCases.useCaseId})`.as('useCaseIds'),
    })
    .from(grantUseCases)
    .groupBy(grantUseCases.grantId)
    .as('grantUseCasesSubquery')

  const grantCategoriesSubquery = db
    .select({
      grantId: grantCategories.grantId,
      categoryIds: sql<string[]>`array_agg(${grantCategories.categoryId})`.as('categoryIds'),
    })
    .from(grantCategories)
    .groupBy(grantCategories.grantId)
    .as('grantCategoriesSubquery')

  const query = db
    .select({
      grantId: grants.id,
      grantName: grants.name,
      grantSlug: grants.slug,
      grantActive: grants.active,
      grantDescription: grants.description,
      grantFundingAmountMin: grants.fundingAmountMin,
      grantFundingAmountMax: grants.fundingAmountMax,
      grantFundingAmountCurrency: grants.fundingAmountCurrency,
      grantFiatCurrencySymbol: fiatCurrencies.symbol,
      grantOrganizationId: grants.organizationId,
      grantOrganizationName: organizations.name,
      grantUrlInfo: grants.urlInfo,
      grantUrlApplication: grants.urlApplication,
      grantCreatedAt: grants.createdAt,
      grantUpdatedAt: grants.updatedAt,
      grantBlockchainIds: grantBlockchainsSubquery.blockchainIds,
      grantUseCaseIds: grantUseCasesSubquery.useCaseIds,
      grantCategoryIds: grantCategoriesSubquery.categoryIds,
    })
    .from(grants)
    .leftJoin(fiatCurrencies, eq(grants.fundingAmountCurrency, fiatCurrencies.id))
    .innerJoin(organizations, eq(grants.organizationId, organizations.id))
    .innerJoin(grantBlockchainsSubquery, eq(grants.id, grantBlockchainsSubquery.grantId))
    .innerJoin(grantUseCasesSubquery, eq(grants.id, grantUseCasesSubquery.grantId))
    .innerJoin(grantCategoriesSubquery, eq(grants.id, grantCategoriesSubquery.grantId))
    .where(
      parsedParams.grantName ? sql`(${grants.name}) ILIKE ${parsedParams.grantName}` : undefined,
    )

  if (orders.length > 0) {
    query.orderBy(...orders)
  }

  const queryWithPagination = withPagination(
    query.$dynamic(),
    parsedParams.page,
    parsedParams.perPage,
  )

  const [grantsData, cachedBlockchainOptions, cachedCategoriesOptions, cachedUseCasesOptions] =
    await Promise.all([
      queryWithPagination,
      getCachedBlockchainOptions(),
      getCachedCategoriesOptions(),
      getCachedUseCasesOptions(),
    ])

  // console.timeEnd('getCampaigns Query Time')
  return {
    grants: grantsData,
    cachedBlockchainOptions,
    cachedCategoriesOptions,
    cachedUseCasesOptions,
  }
}

export type TGetGrantsResponse = Awaited<ReturnType<typeof getGrants>>
export type TGrant = TGetGrantsResponse['grants']['data'][0]

export const getGrantsCount = async () => {
  const result = await db.select({ count: sql<number>`count(${grants.id})` }).from(grants)
  return result[0].count
}
