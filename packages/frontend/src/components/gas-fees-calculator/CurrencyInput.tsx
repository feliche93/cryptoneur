import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { currencies } from '@lib/gas-fees-calculator'
import { Fragment } from 'react'
// import { currencies } from "../../lib/gas-fees-calculator";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CurrencyInput({ selectedCurrency, setSelectedCurrency }) {
  function handleCurrencyChange(currency) {
    setSelectedCurrency(currency)
    // console.log("Currency changed to: " + currency);
    // router.push(
    //   `/gas-fees-calculator/${currency}${
    //     usedGas !== undefined ? "/" + usedGas : ""
    //   }${txnSpeed !== undefined ? "/" + txnSpeed !== undefined : ""}`
    // );
  }

  return (
    <>
      <div className="col-span-1 sm:col-span-1">
        <Listbox value={selectedCurrency} onChange={(event) => handleCurrencyChange(event)}>
          {({ open }) => (
            <>
              <Listbox.Label className="text-text-base-content/80 block text-sm font-medium">
                Currency
              </Listbox.Label>
              <div className="relative mt-1">
                <Listbox.Button className="relative h-full w-full cursor-default rounded-md border border-base-300 bg-base-100 py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm">
                  <span className="block truncate">{selectedCurrency}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-base-content/80"
                      aria-hidden="true"
                    />
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
                    {currencies.map((currency) => (
                      <Listbox.Option
                        key={currency}
                        className={({ active }) =>
                          classNames(
                            active ? 'bg-primary text-white' : 'text-base-content',
                            'relative cursor-default select-none py-2 pl-8 pr-4',
                          )
                        }
                        value={currency}
                      >
                        {({ selectedCurrency, active }) => (
                          <>
                            <span
                              className={classNames(
                                selectedCurrency ? 'font-semibold' : 'font-normal',
                                'block truncate',
                              )}
                            >
                              {currency}
                            </span>
                            {selectedCurrency ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-primary',
                                  'absolute inset-y-0 left-0 flex items-center pl-1.5',
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
      </div>
    </>
  )
}
