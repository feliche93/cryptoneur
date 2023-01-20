import { FC, PropsWithChildren } from 'react'
import { FieldValues, RegisterOptions, useForm, UseFormRegister } from 'react-hook-form'
import { DesktopFilterOption } from './DesktopFilterOption'

export interface DesktopFiltersProps extends PropsWithChildren {
  setMobileFiltersOpen: (open: boolean) => void
  isLoading: boolean
  isRevalidating: boolean
  filters: any
  register: UseFormRegister<FieldValues>
}
export const DeskltopFilters: FC<DesktopFiltersProps> = ({
  children,
  setMobileFiltersOpen,
  isLoading,
  isRevalidating,
  filters,
  register,
}) => {
  // console.log({ filters })
  return (
    <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
      <aside>
        <h2 className="sr-only">Filters</h2>

        {/* Mobile filter button */}
        {/* <button
          type="button"
          className="inline-flex items-center lg:hidden"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <span className="text-sm font-medium text-base-content/80">Filters</span>
          <PlusIcon
            className="ml-1 h-5 w-5 flex-shrink-0 text-base-content/80"
            aria-hidden="true"
          />
        </button> */}

        <div className="hidden lg:block">
          <form className="space-y-10 divide-y divide-gray-200">
            {filters.map((section, sectionIdx) => (
              <div
                key={`${sectionIdx}-${section?.id}`}
                className={sectionIdx === 0 ? null : 'pt-10'}
              >
                <fieldset>
                  <legend className="block text-sm font-medium">{section.name}</legend>
                  <div className="space-y-3 pt-6">
                    {isLoading || isRevalidating ? (
                      // true
                      <>
                        {/* Animated pulse loading bars based on filters?.loadinbBars */}
                        {Array.from({ length: section?.loadingBars }).map((_, idx) => (
                          <div className="h-4 w-full rounded bg-base-300" />
                        ))}
                      </>
                    ) : (
                      section?.options?.map((option: any, optionIdx: number) => {
                        // console.log({ option, optionIdx })
                        return (
                          <DesktopFilterOption
                            key={`${option?.id}-${option?.label}`}
                            optionIdx={optionIdx}
                            option={option}
                            section={section}
                            register={register}
                          />
                        )
                      })
                    )}
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
        {/* <div className="h-96 rounded-lg border-4 border-dashed border-gray-200 lg:h-full">

        </div> */}
        {/* /End replace */}
      </div>
    </div>
  )
}
