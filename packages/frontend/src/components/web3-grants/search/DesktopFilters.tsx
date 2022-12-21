import { FC, PropsWithChildren } from 'react'
import { Fragment, use, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'

export interface DesktopFiltersProps extends PropsWithChildren {
  setMobileFiltersOpen: (open: boolean) => void
  isLoading: boolean
  isRevalidating: boolean
  filters: any
}
export const DeskltopFilters: FC<DesktopFiltersProps> = ({
  children,
  setMobileFiltersOpen,
  isLoading,
  isRevalidating,
  filters,
}) => {
  return (
    <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
      <aside>
        <h2 className="sr-only">Filters</h2>

        <button
          type="button"
          className="inline-flex items-center lg:hidden"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <span className="text-sm font-medium text-base-content/80">Filters</span>
          <PlusIcon className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
        </button>

        <div className="hidden lg:block">
          <form className="space-y-10 divide-y divide-gray-200">
            {!isLoading &&
              !isRevalidating &&
              filters.map((section, sectionIdx) => (
                <div key={section.name} className={sectionIdx === 0 ? null : 'pt-10'}>
                  <fieldset>
                    <legend className="block text-sm font-medium">{section.name}</legend>
                    <div className="space-y-3 pt-6">
                      {!isLoading &&
                        !isRevalidating &&
                        section?.options?.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option.value}
                              type="checkbox"
                              className="h-4 w-4 rounded border-base-300 text-primary focus:ring-primary-focus"
                            />
                            <label
                              htmlFor={`${section.id}-${optionIdx}`}
                              className="ml-3 text-sm text-base-content/80"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                    </div>
                  </fieldset>
                </div>
              ))}
          </form>
        </div>
      </aside>

      {/* Product grid */}
      <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
        {/* Replace with your content */}
        {children}
        <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 lg:h-full" />
        {/* /End replace */}
      </div>
    </div>
  )
}
