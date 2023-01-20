import { FC } from 'react'
import { CheckCircleIcon, ChevronRightIcon, EnvelopeIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { ClockIcon } from '@heroicons/react/24/outline'
import dayjs from 'dayjs'

export interface GrantCardProps {
  grant: any
  isLoadingGrants: boolean
  isFetchingGrants: boolean
}
export const GrantCard: FC<GrantCardProps> = ({ grant }) => {
  // console.log({ ...grant })

  console.log({ ...grant })

  return (
    <>
      <li key={grant?.id}>
        <Link
          href={grant?.slug ? `/web3-grants/${grant?.slug}` : '/web3-grants/search'}
          className="block hover:bg-base-300/10"
        >
          <div className="flex items-center px-4 py-4 sm:px-6">
            <div className="flex min-w-0 flex-1 items-center">
              <div className="flex-shrink-0">
                {grant?.logo ? (
                  <Image
                    className="h-12 w-12 object-contain"
                    src={grant?.logo}
                    width={50}
                    height={50}
                    alt={grant?.grant}
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-base-100/80" />
                )}
              </div>
              <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p className="truncate text-sm font-medium text-primary">{grant?.name}</p>
                  <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                    {grant?.twitter && (
                      <a href={grant?.twitter} rel="" target={'_blank'}>
                        <svg
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 text-base-300 hover:text-primary"
                        >
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    )}
                    {grant?.discord && (
                      <a href={grant?.discord} rel="" target={'_blank'}>
                        <svg
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="h-5 w-5 text-base-300 hover:text-primary"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* <title>Discord</title> */}
                          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                        </svg>
                      </a>
                    )}
                    {grant?.telegram && (
                      <a href={grant?.telegram} rel="" target={'_blank'}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-brand-telegram"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          {' '}
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />{' '}
                          <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />{' '}
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <div className="hidden md:block">
                  <div>
                    <p className="text-sm text-base-content/80">Last updated </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500">
                      <ClockIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-secondary"
                        aria-hidden="true"
                      />
                      <time dateTime={grant?.updated_at}>
                        {dayjs(grant?.updated_at).format('MMMM DD, YYYY')}
                      </time>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
        </Link>
      </li>

      {/* <h2>{grant?.attributes?.name}</h2> */}
    </>
  )
}
