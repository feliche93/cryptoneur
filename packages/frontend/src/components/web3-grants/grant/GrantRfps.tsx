import { TipTap } from '@shared/TipTap'
import { createServerClient } from '@utils/supabase-server'
import { notFound } from 'next/navigation'
import { FC } from 'react'
import { NoInfo } from './NoInfo'

export interface GrantRfpsProps {
  slug: string
  title: string
  description: string
}

// @ts-expect-error Server Component
export const GrantRfps: FC<GrantRfpsProps> = async ({ slug, title, description }) => {
  const supabase = createServerClient()

  const { data: grant, error: grant_error } = await supabase
    .from('grants')
    .select('id')
    .eq('slug', slug)
    .single()

  const { data: rfp_ids, error: rfp_ids_error } = await supabase
    .from('grant_rfps')
    .select('rfp_id')
    .eq('grant_id', grant?.id)

  const rfpIds = rfp_ids?.map((rfp) => rfp.rfp_id)

  if (!rfpIds) return notFound()

  const { data: rfps, error: error_rfps } = await supabase
    .from('rfps')
    .select(
      `
    *,
    rfp_use_cases(use_cases(name)),
    rfp_priorities(*),
    rfp_statuses(status),
    funding_minimum_currency(symbol),
    funding_maximum_currency(symbol)
  `,
    )
    .in('id', rfpIds)

  if (rfps?.length === 0) return null

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
            {rfps?.map((rfp, index) => (
              <dl key={rfp.id} className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1">
                <div>
                  <dt className="text-sm font-medium text-base-content">
                    {index + 1}. {rfp.name}
                  </dt>
                  <dd className="pt-2 pb-4 text-sm font-medium text-base-content/80">
                    {rfp.description}{' '}
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
