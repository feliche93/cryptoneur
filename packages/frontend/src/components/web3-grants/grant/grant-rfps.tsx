import directus from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import { FC } from 'react'
import { z } from 'zod'

const TranslationsSchema = z.object({
  id: z.number(),
  web3_rfps_id: z.number(),
  languages_code: z.string(),
  name: z.string(),
  description: z.string(),
})

const Web3RfpsIdSchema = z.object({
  id: z.number(),
  status: z.string(),
  sort: z.null().optional(),
  user_created: z.string(),
  date_created: z.string(),
  user_updated: z.string().nullable(),
  date_updated: z.string().nullable(),
  funding_minimum: z.number().nullable(),
  funding_maximum: z.number().nullable(),
  funding_mimum_currency_id: z.number().nullable(),
  funding_maximum_currency_id: z.number().nullable(),
  deadline_at: z.string().nullable(),
  rfp_status: z.number().nullable(),
  priority: z.number().nullable(),
  slug: z.string().nullable(),
  translations: z
    .array(TranslationsSchema)
    .min(1)
    .transform((translations) => translations[0]),
})

const RfpsSchema = z.object({
  web3_rfps_id: Web3RfpsIdSchema,
})

const DataSchema = z.object({
  rfps: z.array(RfpsSchema).nullable(),
})

// @ts-expect-error Server Component
export const GrantRfps: FC<BlockType> = async ({ id, lang }) => {
  const title = 'RFPs'
  const description = 'All suggested ideas and projects from grant givers themeselves.'

  const data = await directus.items('web3_grants').readOne(id, {
    fields: ['rfps.web3_rfps_id.*', 'rfps.web3_rfps_id.translations.*'],
    deep: {
      rfps: {
        _filter: {
          web3_rfps_id: {
            translations: {
              languages_code: {
                _starts_with: lang,
              },
            },
          },
        },
      },
    },
  })

  const parsed = DataSchema.parse(data)

  if (!parsed.rfps) return null

  return (
    <>
      <section aria-labelledby="applicant-information-title">
        <div className="bg-base-100 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2
              id="applicant-information-title"
              className="text-lg font-medium leading-6 text-base-content"
            >
              {title}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-base-content/80">{description}</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            {parsed.rfps?.map((rfp, index) => (
              <dl
                key={rfp.web3_rfps_id.id}
                className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1"
              >
                <div>
                  <dt className="text-sm font-medium text-base-content">
                    <div className="flex flex-row">
                      <span>
                        {index + 1}. {rfp.web3_rfps_id.translations.name}
                      </span>
                      {/* <span className="ml-2">{rfp.web3_rfps_id.rfp_status}</span> */}
                    </div>
                  </dt>
                  <dd className="pb-4 pt-2 text-sm font-medium text-base-content/80">
                    {rfp.web3_rfps_id.translations.description}{' '}
                  </dd>
                </div>
              </dl>
            ))}
          </div>

          {/* <div>
            <a
              href={`/web3-grants/${slug}/edit`}
              className="block bg-base-300 px-4 py-4 text-center text-sm font-medium text-base-content/80 hover:text-base-content sm:rounded-b-lg"
            >
              Edit Grant Info
            </a>
          </div> */}
        </div>
      </section>
      {/* <TipTap />
      <pre>{JSON.stringify({ rfps, error_rfps }, null, 2)}</pre> */}
    </>
  )
}
