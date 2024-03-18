import directus from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import { currencyFormatter } from '@utils/helpers'
import { FC } from 'react'
import { z } from 'zod'
import { NoInfo } from './NoInfo'

const grantTranslationsSchema = z.array(
  z.object({
    info_card_subtitle_label: z.string(),
    info_card_title_label: z.string(),
    info_card_about_label: z.string(),
    info_card_supported_blockchains_label: z.string(),
    info_card_grant_category_label: z.string(),
    info_card_grant_use_cases_label: z.string(),
    info_card_minimum_funding_label: z.string(),
    info_card_maximum_funding_label: z.string(),
    edit_grant_label: z.string(),
  }),
)

const schema = z.object({
  id: z.number(),
  status: z.string(),
  sort: z.null(),
  user_created: z.string(),
  date_created: z.string(),
  user_updated: z.string(),
  date_updated: z.string(),
  active: z.boolean(),
  content: z.null(),
  slug: z.string(),
  url_application: z.string(),
  url_info: z.string(),
  funding_minimum: z.number().nullable(),
  funding_maximum: z.number().nullable(),
  github: z.string().nullish(),
  discord: z.string().nullish(),
  telegram: z.string().nullish(),
  website: z.string().nullish(),
  twitter: z.string().nullish(),
  logo: z.string(),
  translations: z.array(
    z.object({
      id: z.number(),
      web3_grants_id: z.number(),
      languages_code: z.string(),
      name: z.string(),
      description: z.string(),
    }),
  ),
  grant_blockchains: z.array(
    z.object({
      web3_blockchains_id: z.object({ id: z.number(), name: z.string() }),
    }),
  ),
  grant_use_cases: z.array(
    z.object({
      web3_use_cases_id: z.object({
        id: z.number(),
        translations: z.array(z.object({ name: z.string() })),
      }),
    }),
  ),
  grant_categories: z.array(
    z.object({
      web3_categories_id: z.object({
        id: z.number(),
        translations: z.array(z.object({ name: z.string() })),
      }),
    }),
  ),
  rfps: z.array(z.number()),
  funding_maximum_currency_id: z.object({ symbol: z.string() }).nullish(),
  funding_minimum_currency_id: z.object({ symbol: z.string() }).nullish(),
})

// @ts-expect-error Server Component
export const GrantInfoCard: FC<BlockType> = async ({ id, lang }) => {
  //@ts-ignore
  const grantData = await directus.items('web3_grants').readOne(id, {
    fields: [
      '*',
      'translations.*',
      'grant_blockchains.web3_blockchains_id.id',
      'grant_blockchains.web3_blockchains_id.name',
      'grant_use_cases.web3_use_cases_id.id',
      'grant_use_cases.web3_use_cases_id.translations.name',
      'grant_categories.web3_categories_id.id',
      'grant_categories.web3_categories_id.translations.name',
      'funding_maximum_currency_id.symbol',
      'funding_minimum_currency_id.symbol',
    ],
  })

  // return <pre>{JSON.stringify(grantData, null, 2)}</pre>

  const parsedGrantData = schema.parse(grantData)

  const [grantDataTranslation] = parsedGrantData.translations

  const grantTranslations = await directus.singleton('web3_grants_detail_page_translations').read({
    fields: [
      'info_card_subtitle_label',
      'info_card_title_label',
      'info_card_about_label',
      'info_card_supported_blockchains_label',
      'info_card_grant_category_label',
      'info_card_grant_use_cases_label',
      'info_card_minimum_funding_label',
      'info_card_maximum_funding_label',
      'edit_grant_label',
    ],
  })

  const parsedGrantTranslations = grantTranslationsSchema.parse(grantTranslations)

  const [grantTranslation] = parsedGrantTranslations

  return (
    <>
      <section aria-labelledby="applicant-information-title">
        <div className="bg-base-100 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2
              id="applicant-information-title"
              className="text-lg font-medium leading-6 text-base-content"
            >
              {grantTranslation.info_card_title_label}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-base-content/80">
              {grantTranslation.info_card_subtitle_label}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {/* About */}
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-base-content/80">
                  {grantTranslation.info_card_about_label}
                </dt>
                <dd className="mt-1 text-sm text-base-content">
                  {grantDataTranslation.description}
                </dd>
              </div>

              {/* Supported Blockchains */}
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-base-content/80">
                  {grantTranslation.info_card_supported_blockchains_label}
                </dt>
                <dd className="mt-1 flex flex-wrap gap-2 text-sm text-base-content">
                  {!!parsedGrantData.grant_blockchains &&
                  parsedGrantData.grant_blockchains.length > 0 ? (
                    <>
                      {parsedGrantData.grant_blockchains.map((blockchain, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-primary px-3 py-0.5 text-sm font-medium text-primary-content"
                        >
                          {blockchain.web3_blockchains_id.name}
                        </span>
                      ))}
                    </>
                  ) : (
                    <NoInfo />
                  )}
                </dd>
              </div>
              {/* Grant Category */}
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-base-content/80">
                  {grantTranslation.info_card_grant_category_label}
                </dt>
                <dd className="mt-1 flex flex-wrap gap-2 text-sm text-base-content">
                  {!!parsedGrantData.grant_categories &&
                  parsedGrantData.grant_categories.length > 0 ? (
                    <>
                      {parsedGrantData.grant_categories.map((category, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-primary px-3 py-0.5 text-sm font-medium text-primary-content"
                        >
                          {category.web3_categories_id.translations[0].name}
                        </span>
                      ))}
                    </>
                  ) : (
                    <NoInfo />
                  )}
                </dd>
              </div>
              {/* Grant Use Cases */}
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-base-content/80">
                  {grantTranslation.info_card_grant_use_cases_label}
                </dt>
                <dd className="mt-1 flex flex-wrap gap-2 text-sm text-base-content">
                  {!!parsedGrantData.grant_use_cases &&
                  parsedGrantData.grant_use_cases.length > 0 ? (
                    <>
                      {parsedGrantData.grant_use_cases.map((useCase, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-primary px-3 py-0.5 text-sm font-medium text-primary-content"
                        >
                          {useCase.web3_use_cases_id.translations[0].name}
                        </span>
                      ))}
                    </>
                  ) : (
                    <NoInfo />
                  )}
                </dd>
              </div>
              {/* Minimum Funding */}
              {!!parsedGrantData.funding_minimum && (
                //!!grant?.funding_minimum_currency &&
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-base-content/80">
                    {grantTranslation.info_card_minimum_funding_label}
                  </dt>
                  <dd className="mt-1 text-sm text-base-content">
                    {currencyFormatter({
                      lang: lang,
                      amount: parsedGrantData.funding_minimum,
                      minimumFractionDigits: 0,
                    })}
                  </dd>
                </div>
              )}
              {/* Maximum Funding */}
              {!!parsedGrantData.funding_maximum && (
                // !!grant?.funding_maximum_currency &&
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-base-content/80">
                    {grantTranslation.info_card_maximum_funding_label}
                  </dt>
                  <dd className="mt-1 text-sm text-base-content">
                    {currencyFormatter({
                      lang: lang,
                      amount: parsedGrantData.funding_maximum,
                      minimumFractionDigits: 0,
                    })}
                  </dd>
                </div>
              )}
            </dl>
          </div>
          {/* <div>
            <a
              href={`/web3-grants/${slug}/edit`}
              className="block bg-base-300 px-4 py-4 text-center text-sm font-medium text-base-content/80 hover:text-base-content sm:rounded-b-lg"
            >
              {grantTranslation.edit_grant_label}
            </a>
          </div> */}
        </div>
      </section>
    </>
  )
}
