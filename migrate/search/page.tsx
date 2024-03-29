import { TanstackTable } from '@components/table/tanstack-table'
import { grantColumns } from '@components/web3-grants/search/grant-columns'
import directus, { getMetaData } from '@lib/directus'
import { Metadata } from 'next'
import { z } from 'zod'

export const revalidate = 60

export const generateMetadata = async ({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> => {
  const { lang } = params

  const metaData = (await getMetaData({ id: 4, lang })) as Metadata

  return metaData
}

const translation = z.object({
  name: z.string(),
})

const useCase = z.object({
  web3_use_cases_id: z.object({
    translations: z.array(translation).transform((translations) => translations[0]),
  }),
})

const grantCategory = z.object({
  web3_categories_id: z.object({
    translations: z.array(translation).transform((translations) => translations[0]),
  }),
})

const blockchain = z.object({
  web3_blockchains_id: z.object({
    name: z.string(),
  }),
})

const grantTranslation = z.object({
  id: z.number(),
  web3_grants_id: z.number(),
  languages_code: z.string(),
  name: z.string(),
  description: z.string(),
})

const currency = z.object({
  symbol: z.string(),
})

const grantSchema = z.object({
  id: z.number(),
  status: z.string(),
  sort: z.null().nullish(),
  user_created: z.string(),
  date_created: z.string(),
  user_updated: z.string(),
  date_updated: z.string(),
  active: z.boolean(),
  content: z.null().nullish(),
  slug: z.string(),
  url_application: z.string(),
  url_info: z.string(),
  funding_minimum: z.number().nullish(),
  funding_maximum: z.number().nullish(),
  github: z.string().nullish(),
  discord: z.string().nullish(),
  telegram: z.string().nullish(),
  website: z.string().nullish(),
  twitter: z.string().nullish(),
  logo: z.string(),
  grant_categories: z
    .array(grantCategory)
    .min(1)
    .transform((categories) =>
      categories.map((category) => category.web3_categories_id.translations.name),
    ),
  translations: z
    .array(grantTranslation)
    .min(1)
    .max(1)
    .transform((translations) => translations[0]),
  rfps: z
    .array(z.number())
    .nullish()
    .transform((rfps) => rfps?.length),
  grant_blockchains: z
    .array(blockchain)
    .min(1)
    .transform((blockchains) =>
      blockchains.map((blockchain) => blockchain.web3_blockchains_id.name),
    ),
  grant_use_cases: z
    .array(useCase)
    .min(1)
    .transform((useCases) =>
      useCases.map((useCase) => useCase.web3_use_cases_id.translations.name),
    ),
  funding_maximum_currency_id: currency.nullish(),
  funding_minimum_currency_id: currency.nullish(),
})

export const responseSchema = z.object({
  data: z.array(grantSchema),
})

export type Grant = z.infer<typeof grantSchema>

const Search = async ({ params }: { params: { lang: string } }) => {
  const { lang } = params
  const data = await directus.items('web3_grants').readByQuery({
    fields: [
      '*',
      'translations.*',
      'grant_blockchains.web3_blockchains_id.name',
      'grant_categories.web3_categories_id.translations.name',
      'grant_use_cases.web3_use_cases_id.translations.name',
      'funding_maximum_currency_id.symbol',
      'funding_minimum_currency_id.symbol',
    ],
    filter: {
      status: {
        _eq: 'published',
      },
    },
    deep: {
      translations: {
        _filter: {
          languages_code: {
            _starts_with: lang,
          },
        },
      },
    },
    limit: -1,
  })

  const parsed = responseSchema.parse(data)

  // return <pre>{JSON.stringify(parsed, null, 2)}</pre>

  const grantFilters = [
    'grant_use_cases',
    'grant_categories',
    'grant_blockchains',
    'funding_minimum',
    'funding_maximum',
    'rfps',
  ]

  return (
    <TanstackTable
      data={parsed.data}
      columns={grantColumns}
      filterColumns={grantFilters}
      enableGlobalFilter={true}
    />
  )
}

export default Search
