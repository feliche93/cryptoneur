'use client'

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { Fragment, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import clsx from 'clsx'
import { ChangeEvent, FC } from 'react'

interface TxnType {
  name: string
  gas: number
}

export interface UsedGasInputProps {
  labelTransactionType: string
  labelUsedGas: string
  txnTypes?: {
    name: string
    gas: number
  }[]
}
export const UsedGaseInput: FC<UsedGasInputProps> = ({
  labelTransactionType,
  labelUsedGas,
  txnTypes,
}) => {
  const { control } = useFormContext() // retrieve all hook methods

  if (!txnTypes) {
    throw new Error('txnTypes is required')
  }

  const { field: selectField } = useController({
    name: 'txnType',
    control,
  })

  const { field: input } = useController({ name: 'usedGas', control })

  const [selectedTxnType, setSelectedTxnType] = useState(selectField.value)
  const [usedGas, setUsedGas] = useState(input.value)

  function handleGasInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setUsedGas(event.target.value)
    input.onChange(event.target.value)
    setSelectedTxnType({ name: 'Custom', gas: Number(event.target.value) })
    selectField.onChange({ name: 'Custom', gas: Number(event.target.value) })
  }

  function handleTxnTypeChange(event: TxnType) {
    console.log('event', event)
    setSelectedTxnType(event)
    selectField.onChange(event)
    setUsedGas(event.gas)
    input.onChange(event.gas)
  }

  const txnTypesWithCustom = [...txnTypes, { name: 'Custom', gas: usedGas }]

  return (
    <>
      <div className="col-span-1 sm:col-span-1">
        <Listbox
          value={selectedTxnType}
          refName={selectField.ref.name}
          onChange={handleTxnTypeChange}
        >
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">
                {labelTransactionType}
              </Listbox.Label>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-focus focus:outline-none focus:ring-1 focus:ring-primary-focus sm:text-sm">
                  <span className="block truncate">{selectedTxnType?.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {txnTypesWithCustom.map((txn, i) => (
                      <Listbox.Option
                        key={i}
                        className={({ active }) =>
                          clsx(
                            active ? 'bg-primary text-primary-content' : 'text-base-content',
                            'relative cursor-default select-none py-2 pl-3 pr-9',
                          )
                        }
                        value={txn}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={clsx(
                                selected ? 'font-semibold' : 'font-normal',
                                'block truncate',
                              )}
                            >
                              {txn.name}
                            </span>

                            {selected ? (
                              <span
                                className={clsx(
                                  active ? 'text-primary-content' : 'text-primary',
                                  'absolute inset-y-0 right-0 flex items-center pr-4',
                                )}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
        <label htmlFor="gas-input" className="block pt-4 text-sm font-medium text-gray-700">
          {labelUsedGas}
        </label>
        <input
          ref={input.ref}
          onBlur={input.onBlur}
          value={usedGas}
          onChange={handleGasInputChange}
          type="number"
          name="gas-input"
          id="gas-input"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary-focus sm:text-sm"
        />
      </div>
    </>
  )
}
