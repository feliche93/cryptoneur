'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { FC, PropsWithChildren, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

export interface FormProps extends PropsWithChildren {
  onSubmit: (data: any) => void
  title: string
  description: string
  schema: any
  prefilledValues?: any
}
export const Form: FC<FormProps> = ({
  children,
  onSubmit,
  title,
  description,
  schema,
  prefilledValues,
}) => {
  const methods = useForm({
    resolver: zodResolver(schema),
  })

  // console.log({ prefilledValues })

  useEffect(() => {
    if (prefilledValues) {
      methods.reset(prefilledValues)
    }
  }, [prefilledValues])

  return (
    <>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div> */}

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-primary">{title}</h3>
                <p className="mt-1 text-sm text-base-content/80">{description}</p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-base-100 px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">{children}</div>
                    </div>
                    <div className="bg-base-300 px-4 py-3 text-right sm:px-6">
                      <button
                        type="submit"
                        className={clsx(
                          Object.keys(methods.formState.errors).length !== 0 ? 'btn-disabled' : '',
                          'btn-primary btn w-full sm:w-fit',
                        )}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
                <>{/* <DevTool id="random" control={methods.control} /> */}</>
              </FormProvider>
            </div>
          </div>
        </div>

        {/* <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div> */}
      </div>
    </>
  )
}
