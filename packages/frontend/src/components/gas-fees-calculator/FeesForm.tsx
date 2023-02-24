'use client'

import { FC, PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { txnTypes } from './UsedGasInput'

export interface FeesFormProps extends PropsWithChildren {}
export const FeesForm: FC<FeesFormProps> = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      currency: 'USD',
      usedGas: txnTypes[0].gas,
      txnType: txnTypes[0],
      gasPrice: 'standard',
    },
  })

  const values = methods.watch()

  console.log({ values })

  return (
    <FormProvider {...methods}>
      <form>
        <div className="space-y-6">{children}</div>
      </form>
    </FormProvider>
  )
}
