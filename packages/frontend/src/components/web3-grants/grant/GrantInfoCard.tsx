import {
  FaceFrownIcon,
  IdentificationIcon,
  PaperClipIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { getGrantbySlug } from '@shared/strapi'
import { FC } from 'react'
import { NoInfo } from './NoInfo'

export interface GrantInfoCardProps {
  slug: string
  title: string
  description: string
}

// @ts-expect-error Server Component
export const GrantInfoCard: FC<GrantInfoCardProps> = async ({ slug, title, description }) => {
  const grant = await getGrantbySlug(
    slug,
    'socials,blockchains,grantUseCases,grantCategories,fundingMinimum,fundingMaximum,fundingMinimum.currency,fundingMaximum.currency',
  )

  // console.log(grant?.attributes?.fundingMaximum?.currency)

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
                <dd className="mt-1 text-sm text-base-content">{grant?.attributes?.description}</dd>
              </div>

              {/* Supported Blockchains */}
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-base-content/80">Suported Blockchains</dt>
                <dd className="mt-1 flex flex-wrap gap-2 text-sm text-base-content">
                  {!!grant?.attributes?.blockchains?.data &&
                  grant?.attributes?.blockchains?.data.length > 0 ? (
                    <>
                      {grant?.attributes?.blockchains?.data.map((blockchain: any) => (
                        <span
                          key={blockchain.id}
                          className="inline-flex items-center rounded-full bg-primary px-3 py-0.5 text-sm font-medium text-primary-content"
                        >
                          {blockchain.attributes.name}
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
                  {!!grant?.attributes?.grantCategories?.data &&
                  grant?.attributes?.grantCategories?.data.length > 0 ? (
                    <>
                      {grant?.attributes?.grantCategories?.data.map((category: any) => (
                        <span
                          key={category.id}
                          className="inline-flex items-center rounded-full bg-primary px-3 py-0.5 text-sm font-medium text-primary-content"
                        >
                          {category.attributes.name}
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
                  {!!grant?.attributes?.grantUseCases?.data &&
                  grant?.attributes?.grantUseCases?.data.length > 0 ? (
                    <>
                      {grant?.attributes?.grantUseCases?.data.map((useCase: any) => (
                        <span
                          key={useCase.id}
                          className="inline-flex items-center rounded-full bg-primary px-3 py-0.5 text-sm font-medium text-primary-content"
                        >
                          {useCase.attributes.name}
                        </span>
                      ))}
                    </>
                  ) : (
                    <NoInfo />
                  )}
                </dd>
              </div>
              {/* Minimum Funding */}
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-base-content/80">Minimum Funding</dt>
                <dd className="mt-1 text-sm text-base-content">
                  {grant?.attributes?.fundingMinimum ? (
                    grant?.attributes?.fundingMinimum?.value +
                    ' ' +
                    grant?.attributes?.fundingMinimum?.currency?.data?.attributes?.symbol
                  ) : (
                    <NoInfo />
                  )}
                </dd>
              </div>
              {/* Maximum Funding */}
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-base-content/80">Maximum Funding</dt>
                <dd className="mt-1 text-sm text-base-content">
                  {grant?.attributes?.fundingMaximum ? (
                    grant?.attributes?.fundingMaximum?.value +
                    ' ' +
                    grant?.attributes?.fundingMaximum?.currency?.data?.attributes?.symbol
                  ) : (
                    <NoInfo />
                  )}
                </dd>
              </div>
              {/* <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-base-content/80">Attachments</dt>
                <dd className="mt-1 text-sm text-base-content">
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 rounded-md border border-gray-200"
                  >
                    {attachments.map((attachment) => (
                      <li
                        key={attachment.name}
                        className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                      >
                        <div className="flex w-0 flex-1 items-center">
                          <PaperClipIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-2 w-0 flex-1 truncate">{attachment.name}</span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a
                            href={attachment.href}
                            className="font-medium text-blue-600 hover:text-blue-500"
                          >
                            Download
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div> */}
            </dl>
          </div>
          {/* <div>
            <a
              href="#"
              className="block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-base-content/80 hover:text-gray-700 sm:rounded-b-lg"
            >
              Read full application
            </a>
          </div> */}
        </div>
      </section>
    </>
  )
}
