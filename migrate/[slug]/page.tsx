import { GrantInfoCard } from '@components/web3-grants/grant/grant-info-card'
import { GrantRfps } from '@components/web3-grants/grant/grant-rfps'
import { Header } from '@components/web3-grants/grant/header'
import directus from '@lib/directus'
import { getAssetUrl } from '@lib/utils'
import { Metadata } from 'next'
import { z } from 'zod'
import { responseSchema } from '../search/page'

export const revalidate = 60

export const generateMetadata = async ({ params }: { params: { slug: string; lang: string } }) => {
  const { slug, lang } = params

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
      slug: {
        _eq: slug,
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
  const [grant] = parsed.data

  // Shorten Description
  function shortenDescription(description: string, maxLength: number): string {
    if (description.length <= maxLength) return description

    const truncated = description.slice(0, maxLength)
    const lastPeriodIndex = truncated.lastIndexOf('.')
    return lastPeriodIndex === -1 ? truncated : truncated.slice(0, lastPeriodIndex + 1)
  }

  // combined use cases and categories
  const keywords = [grant.translations.name, ...grant.grant_use_cases, ...grant.grant_categories]
  const description = shortenDescription(grant.translations.description, 160)
  const title = `Web3 Crunchbase - ${grant.translations.name}`

  const images = [
    {
      url: getAssetUrl(grant.logo),
      width: 1200,
      height: 630,
      alt: grant.translations.name,
    },
  ]

  // example image url
  // https://directus.cryptoneur.xyz/assets/1ac73658-8b62-4dea-b6da-529fbc9d01a4?fit=contain&width=1200&height=630&quality=80

  const metadata: Metadata = {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      locale: lang,
      images,
    },
    twitter: {
      title,
      description,
      images,
    },
  }

  return metadata
}

const grantDataSchema = z.array(
  z.object({
    slug: z.string(),
    id: z.number(),
    translations: z
      .array(
        z.object({
          id: z.number(),
        }),
      )
      .min(1)
      .transform((translations) => translations[0]),
  }),
)

const Web3GrantsDetailPage = async ({ params }: { params: { slug: string; lang: string } }) => {
  const { slug, lang } = params

  const { data: grantData } = await directus.items('web3_grants').readByQuery({
    fields: ['slug', 'id', 'translations.id'],
    filter: {
      slug: {
        _eq: slug,
      },
    },
  })

  const parsedGrantData = grantDataSchema.parse(grantData)

  const [grant] = parsedGrantData

  return (
    <>
      <main className="py-10">
        {/* Page header */}
        <Header id={grant.translations.id} lang={lang} />

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2 lg:col-start-1">
            {/* Description list*/}

            <GrantInfoCard id={grant.id} lang={lang} />
            <GrantRfps id={grant.id} lang={lang} />
          </div>
        </div>
      </main>
    </>
  )
}

export default Web3GrantsDetailPage
