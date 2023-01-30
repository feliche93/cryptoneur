'use client'

import { FC, PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import clsx from 'clsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export interface FormProps extends PropsWithChildren {
  className?: string
  schema: z.ZodSchema<any>
  apiKeyValid?: boolean
}
export const Form: FC<FormProps> = ({ children, className, schema }) => {
  const methods = useForm({
    resolver: zodResolver(schema),
  })

  const watch = methods.watch()

  console.log({ ...watch })

  return (
    <FormProvider {...methods}>
      <form className={clsx(className)}>{children}</form>
    </FormProvider>
  )
}
