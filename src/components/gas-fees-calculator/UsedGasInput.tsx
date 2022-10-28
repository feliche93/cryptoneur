import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UsedGasInput({ usedGas, setUsedGas }) {

  const txnTypes = [
    { id: 1, name: 'Standard Transfer', gas: 21000 },
    { id: 2, name: 'ERC20 Token: Approval', gas: 45000 },
    { id: 3, name: 'ERC20 Token: Transfer', gas: 65000 },
    { id: 4, name: 'ERC721 Token: Transfer', gas: 85000 },
    { id: 5, name: 'Uniswap V2: Swap', gas: 150000 },
    { id: 6, name: 'Uniswap V3: Swap', gas: 184523 },
    { id: 7, name: 'L2: Deposits', gas: 250000 },
    { id: 8, name: 'ENS Domain: Registration', gas: 265000 },
    { id: 9, name: 'OpenSea: Sale', gas: 202326 },
    { id: 10, name: 'USDT: Transfer', gas: 54128 },
    { id: 11, name: 'Gnosis Safe: Creation with 2 Owners', gas: 307126 },
    { id: 12, name: 'Gnosis Safe: Creation with 3 Owners', gas: 331341 },
    { id: 13, name: 'Gnosis Safe: Creation with 4 Owners', gas: 355556 },
    { id: 14, name: 'Custom Type', gas: usedGas },
  ]

  const [selectedTxnType, setSelectedTxnType] = useState(txnTypes[0])

  function handleGasInputChange(event) {
    setUsedGas(event.target.value)
    setSelectedTxnType(txnTypes.find(txnType => txnType.name === 'Custom Type'));
  }

  function handleTxnTypeChange(event) {
    setSelectedTxnType(event);
    // console.log(event.gas);
    setUsedGas(event.gas);
  }

  return (
    <>
      <div className="col-span-1 sm:col-span-1">
        <Listbox value={selectedTxnType} onChange={handleTxnTypeChange}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">Transaction Type</Listbox.Label>
              <div className="mt-1 relative">
                <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <span className="block truncate">{selectedTxnType.name}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {txnTypes.map((person) => (
                      <Listbox.Option
                        key={person.id}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-blue-600' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                          )
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                              {person.name}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-blue-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
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
        <label htmlFor="gas-input" className="pt-4 block text-sm font-medium text-gray-700">
          Used Gas
        </label>
        <input
          value={usedGas}
          onChange={handleGasInputChange}
          type="number"
          name="gas-input"
          id="gas-input"
          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </>
  )
}
