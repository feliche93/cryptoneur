import { db, withTableFeatures } from '@/lib/db'
import { STableSearchParams } from '@/models/data-table'
import { fiatCurrencies, grants, organizations } from '@/schema'
import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'

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

  const [column, order] = parsedParams.sort?.split('.') ?? []
  const sortOrder = order === 'desc' ? 'desc' : order === 'asc' ? 'asc' : undefined

  // const grantBlockchainsSubquery = db.select().from(gra)

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
    })
    .from(grants)
    .leftJoin(fiatCurrencies, eq(grants.fundingAmountCurrency, fiatCurrencies.id))
    .innerJoin(organizations, eq(grants.organizationId, organizations.id))
    .where(
      parsedParams.grantName ? sql`(${grants.name}) ILIKE ${parsedParams.grantName}` : undefined,
    )

  const result = await withTableFeatures(query.$dynamic(), {
    ...parsedParams,
    order: sortOrder,
    orderBy: column,
    sortMap: {
      default: grants.name,
      grantFundingAmountMin: grants.fundingAmountMin,
      grantFundingAmountMax: grants.fundingAmountMax,
      grantOrganizationName: organizations.name,
      grantName: grants.name,
      // websiteUrl: websites.url,
      // campaignTypeName: campaignTypes.name,
      // campaignCreatedAt: campaigns.createdAt,
    },
  })
  // console.timeEnd('getCampaigns Query Time')
  return result
}

export type TGetGrantsResponse = Awaited<ReturnType<typeof getGrants>>
export type TGrant = TGetGrantsResponse['data'][0]

export const getGrantsCount = async () => {
  const result = await db.select({ count: sql<number>`count(${grants.id})` }).from(grants)
  return result[0].count
}
