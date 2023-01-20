'use client'

import React from 'react'

import { Disclosure } from '@headlessui/react'

import { FC } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { classNames } from '@utils/helpers'

export const Faq: FC = () => {
  const faqs = [
    {
      question: 'What is your web3 grant platform about?',
      answer:
        'Our web3 grant platform is a comprehensive and constantly updated database of web3 grants, making it easy for users to find the perfect funding opportunity for their project. Our advanced filtering options allow users to quickly and easily search for grants by category, blockchain ecosystem, funding amount, or use cases. We also provide valuable data-driven insights on past and successful grant applications, giving users the knowledge they need to increase their chances of success. And with the ability for anyone to contribute and add information, our community is constantly growing and making our database even more complete.',
    },
    {
      question: 'What kind of grants can I find on your platform?',
      answer:
        'Our platform offers a wide range of web3 grants that you can filter by category, blockchain ecosystem, funding amount, or use cases.',
    },
    {
      question: 'How do I apply for a grant on your platform?',
      answer:
        'The process for applying for a grant on our platform varies depending on the grant. You can find the application instructions for each grant on the grant page.',
    },
    {
      question: 'Is there a cost to use your platform?',
      answer: 'No, our platform is free to use.',
    },
    {
      question: 'Can I contribute to the database?',
      answer:
        'Yes, anyone can contribute and add information to our database. This will help to make our database even more complete and accurate.',
    },
  ]

  return (
    <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl divide-y-2 divide-base-300">
        <h2 className="text-center text-3xl font-extrabold sm:text-4xl">FAQ</h2>
        <dl className="mt-6 space-y-6 divide-y divide-base-300">
          {faqs.map((qa, index) => (
            <Disclosure as="div" key={index} className="pt-6">
              {({ open }) => (
                <>
                  <dt className="text-lg">
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-base-content/70">
                      <span className="font-medium text-base-content">{qa?.question}</span>
                      <span className="ml-6 flex h-7 items-center">
                        <ChevronDownIcon
                          className={classNames(
                            open ? '-rotate-180' : 'rotate-0',
                            'h-6 w-6 transform',
                          )}
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
