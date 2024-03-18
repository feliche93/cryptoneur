'use client'

import { FC } from 'react'
import { useController, useFormContext } from 'react-hook-form'

export interface GasPriceRadioProps {
  labelStandard: string
  labelFast: string
  labelInstant: string
  labelTransactionSpeed: string
}
export const GasPriceRadio: FC<GasPriceRadioProps> = ({
  labelStandard,
  labelFast,
  labelInstant,
  labelTransactionSpeed,
}) => {
  const gasPriceOption = ['standard', 'fast', 'instant']

  const { control } = useFormContext()
  const { field } = useController({ name: 'gasPrice', control })

  return (
    <div className="col-span-1 sm:col-span-1">
      <label htmlFor="gas-input" className="block text-sm font-medium text-gray-700">
        Transaction Speed
      </label>
      <fieldset className="mt-2">
        <legend className="sr-only">Gas Price Radio</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {gasPriceOption.map((option) => (
            <div key={option} className="flex items-center">
              <input
                id={option}
                onChange={() => field.onChange(option)}
                name="gas-price-option"
                type="radio"
                defaultChecked={option === 'standard'}
                className="h-4 w-4 border-base-200 text-primary focus:ring-primary-focus"
              />
              <label htmlFor={option} className="ml-3 block text-sm font-normal capitalize">
                {option}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
