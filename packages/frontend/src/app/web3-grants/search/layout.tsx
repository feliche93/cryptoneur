'use client'

import { Fragment, use, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'
import { strapi } from '@shared/strapi'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'
import { Header } from '@components/web3-grants/search/Header'
import { DeskltopFilters } from '@components/web3-grants/search/DesktopFilters'

async function fetchStrapiData(url: any) {
  const { data, meta } = await strapi.find(url, {
    populate: 'deep',
  })

  //   console.log({ data })

  return data
}

export default function Searchayout({ children }: { children: React.ReactNode }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const {
    data: grantCategories,
    isLoading: isLoadingGrantCategories,
    isValidating: isValidatingGrantCategories,
  } = useSWR('grant-categories', fetchStrapiData)

  // blockchains
  const {
    data: blockchains,
    isLoading: isLoadingBlockchains,
    isValidating: isValidatingBlockchains,
  } = useSWR('blockchains', fetchStrapiData)

  // grant-use-cases
  const {
    data: grantUseCases,
    isLoading: isLoadingGrantUseCases,
    isValidating: isValidatingGrantUseCases,
  } = useSWR('grant-use-cases', fetchStrapiData)

  console.log({ blockchains })

  let filters = [
    {
      id: 'color',
      name: 'Color',
      options: [
        { value: 'white', label: 'White' },
        { value: 'beige', label: 'Beige' },
        { value: 'blue', label: 'Blue' },
        { value: 'brown', label: 'Brown' },
        { value: 'green', label: 'Green' },
        { value: 'purple', label: 'Purple' },
      ],
    },
    {
      id: 'category',
      name: 'Category',
      options: [
        { value: 'new-arrivals', label: 'All New Arrivals' },
        { value: 'tees', label: 'Tees' },
        { value: 'crewnecks', label: 'Crewnecks' },
        { value: 'sweatshirts', label: 'Sweatshirts' },
        { value: 'pants-shorts', label: 'Pants & Shorts' },
      ],
    },
    {
      id: 'sizes',
      name: 'Sizes',
      options: [
        { value: 'xs', label: 'XS' },
        { value: 's', label: 'S' },
        { value: 'm', label: 'M' },
        { value: 'l', label: 'L' },
        { value: 'xl', label: 'XL' },
        { value: '2xl', label: '2XL' },
      ],
    },
  ]

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }

  filters = [
    {
      id: 'blockchains',
      name: 'Blockchains',
      options: blockchains?.map((blockchain: any) => ({
        value: blockchain.id,
        label: blockchain?.attributes?.name,
      })),
    },
    {
      id: 'grant-categories',
      name: 'Grant Categories',
      options: grantCategories?.map((grantCategory: any) => ({
        value: grantCategory.id,
        label: grantCategory?.attributes?.name,
      })),
    },
    {
      id: 'grant-use-cases',
      name: 'Grant Use Cases',
      options: grantUseCases?.map((grantUseCase: any) => ({
        value: grantUseCase.id,
        label: grantUseCase?.attributes?.name,
      })),
    },
  ]

  const isLoading = isLoadingGrantCategories && isLoadingBlockchains && isLoadingGrantUseCases
  const isRevalidating =
    isValidatingGrantCategories && isValidatingBlockchains && isValidatingGrantUseCases

  //   console.log({ filters2 })

  //   if (isLoadingGrantCategories && isLoadingBlockchains && isLoadingGrantUseCases)
  //     return <div>Loading...</div>

  //   if (isValidatingGrantCategories && isValidatingBlockchains && isLoadingGrantUseCases)
  //     return <div>Validating...</div>

  return (
    <div>
      {/* Mobile filter dialog */}
      {/* <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-base-100 py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>


                <form className="mt-4">
                  {!isLoading &&
                    !isRevalidating &&
                    filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.name}
                        className="border-t border-gray-200 pt-4 pb-4"
                      >
                        {({ open }) => (
                          <fieldset>
                            <legend className="w-full px-2">
                              <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                <span className="text-sm font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex h-7 items-center">
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? '-rotate-180' : 'rotate-0',
                                      'h-5 w-5 transform',
                                    )}
                                    aria-hidden="true"
                                  />
                                </span>
                              </Disclosure.Button>
                            </legend>
                            <Disclosure.Panel className="px-4 pt-4 pb-2">
                              <div className="space-y-6">
                                {!isLoading &&
                                  !isRevalidating &&
                                  section?.options?.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center">
                                      <input
                                        id={`${section.id}-${optionIdx}-mobile`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary-focus"
                                      />
                                      <label
                                        htmlFor={`${section.id}-${optionIdx}-mobile`}
                                        className="ml-3 text-sm text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                              </div>
                            </Disclosure.Panel>
                          </fieldset>
                        )}
                      </Disclosure>
                    ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root> */}

      <main className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <Header />
        <DeskltopFilters
          filters={filters}
          isLoading={isLoading}
          isRevalidating={isRevalidating}
          setMobileFiltersOpen={setMobileFiltersOpen}
        />
      </main>
    </div>
  )
}
