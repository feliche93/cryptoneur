import { db, withPagination } from '@/lib/db'
import { STableSearchParams } from '@/models/data-table'
import {
  blockchains,
  categories,
  fiatCurrencies,
  grantBlockchains,
  grantCategories,
  grantUseCases,
  grants,
  organizations,
  useCases,
} from '@/schema'
import { SQL, and, arrayOverlaps, asc, desc, eq, sql } from 'drizzle-orm'
import { z } from 'zod'
import { getCachedBlockchainOptions } from './blockchains'
import { getCachedCategoriesOptions } from './categories'
import { getCachedUseCasesOptions } from './use-cases'

export const SGetGrantsParams = z
  .object({
    grantId: z.string().optional(),
    grantBlockchainNames: z
      .string()
      .or(z.array(z.string()))
      .optional()
      .transform((v) => {
        if (!v) return undefined
        if (Array.isArray(v)) return v
        return v.split('.')
      }),
    grantUseCaseNames: z
      .string()
      .or(z.array(z.string()))
      .optional()
      .transform((v) => {
        if (!v) return undefined
        if (Array.isArray(v)) return v
        return v.split('.')
      }),
    grantCategoryNames: z
      .string()
      .or(z.array(z.string()))
      .optional()
      .transform((v) => {
        if (!v) return undefined
        if (Array.isArray(v)) return v
        return v.split('.')
      }),
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
      blockchainNames: sql<string[]>`array_agg(${blockchains.name})`.as('blockchainNames'),
    })
    .from(grantBlockchains)
    .innerJoin(blockchains, eq(grantBlockchains.blockchainId, blockchains.id))
    .groupBy(grantBlockchains.grantId)
    .as('grantBlockchainsSubquery')

  const grantUseCasesSubquery = db
    .select({
      grantId: grantUseCases.grantId,
      useCaseIds: sql<string[]>`array_agg(${grantUseCases.useCaseId})`.as('useCaseIds'),
      useCaseNames: sql<string[]>`array_agg(${useCases.name})`.as('useCaseNames'),
    })
    .from(grantUseCases)
    .innerJoin(useCases, eq(grantUseCases.useCaseId, useCases.id))
    .groupBy(grantUseCases.grantId)
    .as('grantUseCasesSubquery')

  const grantCategoriesSubquery = db
    .select({
      grantId: grantCategories.grantId,
      categoryIds: sql<string[]>`array_agg(${grantCategories.categoryId})`.as('categoryIds'),
      categoryNames: sql<string[]>`array_agg(${categories.name})`.as('categoryNames'),
    })
    .from(grantCategories)
    .innerJoin(categories, eq(grantCategories.categoryId, categories.id))
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
      grantBlockchainNames: grantBlockchainsSubquery.blockchainNames,
      grantUseCaseIds: grantUseCasesSubquery.useCaseIds,
      grantUseCaseNames: grantUseCasesSubquery.useCaseNames,
      grantCategoryIds: grantCategoriesSubquery.categoryIds,
      grantCategoryNames: grantCategoriesSubquery.categoryNames,
    })
    .from(grants)
    .leftJoin(fiatCurrencies, eq(grants.fundingAmountCurrency, fiatCurrencies.id))
    .innerJoin(organizations, eq(grants.organizationId, organizations.id))
    .leftJoin(grantBlockchainsSubquery, eq(grants.id, grantBlockchainsSubquery.grantId))
    .leftJoin(grantUseCasesSubquery, eq(grants.id, grantUseCasesSubquery.grantId))
    .leftJoin(grantCategoriesSubquery, eq(grants.id, grantCategoriesSubquery.grantId))
    .where(
      and(
        parsedParams.grantName ? sql`(${grants.name}) ILIKE ${parsedParams.grantName}` : undefined,
        parsedParams.grantBlockchainNames && parsedParams.grantBlockchainNames.length > 0
          ? arrayOverlaps(
              grantBlockchainsSubquery.blockchainIds,
              sql<string[]>`STRING_TO_ARRAY(${parsedParams.grantBlockchainNames.join(',')}, ',')`,
            )
          : undefined,
        parsedParams.grantUseCaseNames && parsedParams.grantUseCaseNames.length > 0
          ? arrayOverlaps(
              grantUseCasesSubquery.useCaseIds,
              sql<string[]>`STRING_TO_ARRAY(${parsedParams.grantUseCaseNames.join(',')}, ',')`,
            )
          : undefined,
        parsedParams.grantCategoryNames && parsedParams.grantCategoryNames.length > 0
          ? arrayOverlaps(
              grantCategoriesSubquery.categoryIds,
              sql<string[]>`STRING_TO_ARRAY(${parsedParams.grantCategoryNames.join(',')}, ',')`,
            )
          : undefined,
      ),
    )

  if (orders.length > 0) {
    query.orderBy(...orders)
  }

  const queryWithPagination = withPagination(
    query.$dynamic(),
    parsedParams.page,
    parsedParams.per_page,
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
