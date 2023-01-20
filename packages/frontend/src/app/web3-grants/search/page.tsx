'use client'

import { DeskltopFilters } from '@components/web3-grants/search/DesktopFilters'
import { GrantCard } from '@components/web3-grants/search/GrantCard'
import { Header } from '@components/web3-grants/search/Header'
import { strapi } from '@shared/strapi'
import { useQuery } from '@tanstack/react-query'
import { createBrowserClient } from '@utils/supabase-browser'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'

// TODO: Continue filtering

const supabase = createBrowserClient()

async function getData(table, columns, queryFilters) {
  let query = supabase.from(table).select(columns)

  console.log({ queryFilters })

  if (queryFilters?.categories && queryFilters?.categories.length > 0) {
    console.log({ ...queryFilters })

    query = query.in('categories.id', queryFilters?.categories)
  }

  if (queryFilters?.use_cases && queryFilters?.use_cases.length > 0) {
    query = query.in('use_cases.id', queryFilters?.use_cases)
  }

  if (queryFilters?.blockchains && queryFilters?.blockchains.length > 0) {
    console.log({ queryFilters })
    query = query.in('blockchains.id', queryFilters?.blockchains)
  }

  const { data, error } = await query

  error && console.log({ error })

  return data
}

function useGrants(table, columns, queryFilters) {
  return useQuery({
    queryKey: [table, columns, queryFilters],
    queryFn: () => getData(table, columns, queryFilters),
  })
}

export default function Search() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const {
    register,
    watch,
    formState: { errors },
  } = useForm()

  const {
    status,
    data: grants,
    error,
    isFetching: isFetchingGrants,
    isLoading: isLoadingGrants,
  } = useGrants(
    'grants',
    'id,logo,twitter,discord,github,telegram,updated_at,slug,name,blockchains!inner(id),categories!inner(id),use_cases!inner(id)',
    {
      ...watch(),
    },
  )

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isFetching: isFetchingCategories,
  } = useGrants('categories', 'id,name', {})

  // blockchains
  const {
    data: blockchains,
    isLoading: isLoadingBlockchains,
    isFetching: isFetchingBlockchains,
  } = useGrants('blockchains', 'id,name', {})

  // grant-use-cases
  const {
    data: useCases,
    isLoading: isLoadingUseCases,
    isFetching: isFetchingUseCases,
  } = useGrants('use_cases', 'id,name', {})

  const data = watch()
  // console.log({ data })

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }

  // console.log({ blockchains })

  const filters = [
    {
      id: 'blockchains',
      name: 'Grant Blockchains',
      loadingBars: 22,
      options: blockchains?.map((blockchain: any) => ({
        value: blockchain.id,
        label: blockchain?.name,
      })),
    },
    {
      id: 'categories',
      name: 'Grant Categories',
      loadingBars: 15,
      options: categories?.map((category: any) => ({
        value: category.id,
        label: category?.name,
      })),
    },
    {
      id: 'use_cases',
      name: 'Grant Use Cases',
      loadingBars: 10,
      options: useCases?.map((useCase: any) => ({
        value: useCase.id,
        label: useCase?.name,
      })),
    },
  ]

  // console.log({ filters })
  // console.log({ useCases, blockchains, categories })

  const isLoading = isLoadingCategories && isLoadingBlockchains && isLoadingUseCases
  const isRevalidating = isFetchingCategories && isFetchingBlockchains && isFetchingUseCases
  // console.log({ grants })

  // console.log({ isLoading, isRevalidating })

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
          register={register}
        >
          <div className="overflow-hidden bg-base-100 shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-base-300">
              {isLoadingGrants || isFetchingGrants ? (
                <>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <li key={i}>
                      <div className="flex items-center px-4 py-4 sm:px-6">
                        <div className="flex min-w-0 flex-1 items-center">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 animate-pulse rounded-full bg-base-200" />
                          </div>
                        </div>
                        <div className="h-full w-full flex-col space-y-3">
                          <div className="ml-20 h-4 w-2/5 animate-pulse rounded-full bg-base-200" />
                          <div className="ml-20 h-4 w-2/5 animate-pulse rounded-full bg-base-200" />
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {grants?.map((grant: any) => (
                    <GrantCard
                      key={grant.id}
                      grant={grant}
                      isLoadingGrants={isLoadingGrants}
                      isFetchingGrants={isFetchingGrants}
                    />
                  ))}
                </>
              )}
            </ul>
          </div>
        </DeskltopFilters>
      </main>
    </div>
  )
}
