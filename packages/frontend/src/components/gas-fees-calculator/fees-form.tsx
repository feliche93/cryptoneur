'use client'

import { FC, PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { txnTypes } from './used-gas-input'

export interface FeesFormProps extends PropsWithChildren {
  txnTypes:
    | {
        name: string
        gas: number
      }[]
    | undefined
}
export const FeesForm: FC<FeesFormProps> = ({ children, txnTypes }) => {
  if (!txnTypes) {
    throw new Error('txnTypes is required')
  }

  const methods = useForm({
    defaultValues: {
      currency: 'USD',
      usedGas: txnTypes[0].gas,
      txnType: txnTypes[0],
      gasPrice: 'standard',
    },
  })

  return (
    <FormProvider {...methods}>
      <form>
        <div className="space-y-6">{children}</div>
      </form>
    </FormProvider>
  )
}
