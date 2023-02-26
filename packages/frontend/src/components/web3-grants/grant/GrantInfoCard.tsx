import { createServerClient } from '@utils/supabase-server'
import { FC } from 'react'
import { NoInfo } from './NoInfo'

export interface GrantInfoCardProps {
  slug: string
  title: string
  description: string
}

// @ts-expect-error Server Component
export const GrantInfoCard: FC<GrantInfoCardProps> = async ({ slug, title, description }) => {
  const supabase = createServerClient()
  const { data: grant, error } = await supabase
    .from('grants')
    .select(
      `
      *,
      blockchains(*),
      categories(*),
      use_cases(*),
      funding_minimum_currency(symbol),
      funding_maximum_currency(symbol)
      `,
    )
    .eq('slug', slug)
    .single()

  // console.log({ ...grant, ...error })

  const attachments = [
    { name: 'resume_front_end_developer.pdf', href: '#' },
    { name: 'coverletter_front_end_developer.pdf', href: '#' },
  ]
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
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {/* About */}
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-base-content/80">About</dt>
                <dd className="mt-1 text-sm text-base-content">{grant?.description}</dd>
              </div>

              {/* Supported Blockchains */}
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-base-content/80">Suported Blockchains</dt>
                <dd className="mt-1 flex flex-wrap gap-2 text-sm text-base-content">
                  {!!grant?.blockchains && grant?.blockchains.length > 0 ? (
                    <>
                      {grant?.blockchains.map((blockchain: any) => (
                        <span
                          key={blockchain.id}
                          className="inline-flex items-center rounded-full bg-primary px-3 py-0.5 text-sm font-medium text-primary-content"
                        >
                          {blockchain.name}
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
                <dt className="text-sm font-medium text-base-content/80">Grant Category</dt>
                <dd className="mt-1 flex flex-wrap gap-2 text-sm text-base-content">
                  {!!grant?.categories && grant?.categories.length > 0 ? (
                    <>
                      {grant?.categories.map((category: any) => (
                        <span
                          key={category.id}
                          className="inline-flex items-center rounded-full bg-primary px-3 py-0.5 text-sm font-medium text-primary-content"
                        >
                          {category.name}
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
                <dt className="text-sm font-medium text-base-content/80">Grant Use Cases</dt>
                <dd className="mt-1 flex flex-wrap gap-2 text-sm text-base-content">
                  {!!grant?.use_cases && grant?.use_cases.length > 0 ? (
                    <>
                      {grant?.use_cases.map((useCase: any) => (
                        <span
                          key={useCase.id}
                          className="inline-flex items-center rounded-full bg-primary px-3 py-0.5 text-sm font-medium text-primary-content"
                        >
                          {useCase.name}
                        </span>
                      ))}
                    </>
                  ) : (
                    <NoInfo />
                  )}
                </dd>
              </div>
              {/* Minimum Funding */}
              {!!grant?.funding_minimum && !!grant?.funding_minimum_currency && (
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-base-content/80">Minimum Funding</dt>
                  <dd className="mt-1 text-sm text-base-content">
                    {`${grant?.funding_minimum.toLocaleString()} ${
                      grant?.funding_minimum_currency?.symbol
                    }`}
                  </dd>
                </div>
              )}
              {/* Maximum Funding */}
              {!!grant?.funding_maximum && !!grant?.funding_maximum_currency && (
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-base-content/80">Maximum Funding</dt>
                  <dd className="mt-1 text-sm text-base-content">
                    {`${grant?.funding_maximum.toLocaleString()} ${
                      grant?.funding_maximum_currency?.symbol
                    }`}
                  </dd>
                </div>
              )}
            </dl>
          </div>
          <div>
            <a
              href={`/web3-grants/${slug}/edit`}
              className="block bg-base-300 px-4 py-4 text-center text-sm font-medium text-base-content/80 hover:text-base-content sm:rounded-b-lg"
            >
              Edit Grant Info
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
