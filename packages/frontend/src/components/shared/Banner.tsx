import { GiftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { FC, useState } from 'react'

export interface BannerProps {}
export const Banner: FC<BannerProps> = () => {
  const [show, setShow] = useState(true)
  return (
    <>
      {show && (
        <div className="fixed inset-x-0 bottom-0 pb-2 sm:pb-5">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-primary p-2 shadow-lg sm:p-3">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex w-0 flex-1 items-center">
                  <span className="flex rounded-lg bg-primary-focus p-2">
                    <GiftIcon className="h-6 w-6 text-primary-content" aria-hidden="true" />
                  </span>
                  <p className="ml-3 truncate font-medium text-primary-content">
                    <span className="text-sm md:hidden">Live: Crypto Jokes Advent Calendar 🎄</span>
                    <span className="hidden md:inline">
                      🎅🏼🎄🎁 Unwrap a daily dose of crypto cheer with our free advent calendar!
                      🎅🏼🎄🎁 Check out our handpicked jokes 👉
                    </span>
                  </p>
                </div>
                <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
                  <Link href="/advent-calendar" className="btn-secondary btn w-full">
                    Make me laugh
                  </Link>
                </div>
                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                  <button
                    onClick={() => setShow(false)}
                    type="button"
                    className="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon className="h-6 w-6 text-primary-content" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
