'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { cn } from '@lib/utils'
import { FC } from 'react'

export interface BlockFaqWrapperProps {
  title: string
  faqs: any
}
export const BlockFaqWrapper: FC<BlockFaqWrapperProps> = ({ title, faqs }) => {
  return (
    <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl divide-y-2 divide-base-300">
        <h2 className="text-center text-3xl font-extrabold sm:text-4xl">{title}</h2>
        <dl className="mt-6 space-y-6 divide-y divide-base-300">
          {faqs.map((qa: any, index: number) => (
            <Disclosure as="div" key={index} className="pt-6">
              {({ open }) => (
                <>
                  <dt className="text-lg">
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-base-content/70">
                      <span className="font-medium text-base-content">{qa?.question}</span>
                      <span className="ml-6 flex h-7 items-center">
                        <ChevronDownIcon
                          className={cn(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                          aria-hidden="true"
                        />
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base text-base-content/70">{qa?.answer}</p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </div>
  )
}
