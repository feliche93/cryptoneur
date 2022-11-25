"use client";

import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
// import { currencies } from "../../lib/gas-fees-calculator";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CurrencyInput({
  selectedCurrency,
  setSelectedCurrency,
}) {
  const currencies = [
    "USD",
    "EUR",
    "JPY",
    "GBP",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "HKD",
    "NZD",
    "SEK",
    "KRW",
    "SGD",
    "NOK",
    "MXN",
    "INR",
    "RUB",
    "ZAR",
    "TRY",
    "BRL",
    "TWD",
    "DKK",
    "PLN",
    "THB",
    "IDR",
    "HUF",
    "CZK",
    "ILS",
    "CLP",
    "PHP",
    "AED",
    "COP",
    "SAR",
    "MYR",
    "RON",
  ];

  const router = useRouter();
  const pathname = usePathname();

  const pathnames = pathname.split("/");
  const currency = pathnames[2];
  const usedGas = pathnames[3];
  const txnSpeed = pathnames[4];

  // const [selectedCurrency, setSelectedCurrency] = useState(
  //   currencies.includes(currency) ? currency : "USD"
  // );

  function handleCurrencyChange(currency) {
    setSelectedCurrency(currency);
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
        <Listbox
          value={selectedCurrency}
          onChange={(event) => handleCurrencyChange(event)}
        >
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-text-base-content/80">
                Currency
              </Listbox.Label>
              <div className="mt-1 relative">
                <Listbox.Button className="relative w-full h-full bg-base-100 border border-base-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm">
                  <span className="block truncate">{selectedCurrency}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {currencies.map((currency) => (
                      <Listbox.Option
                        key={currency}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "text-white bg-primary"
                              : "text-base-content",
                            "cursor-default select-none relative py-2 pl-8 pr-4"
                          )
                        }
                        value={currency}
                      >
                        {({ selectedCurrency, active }) => (
                          <>
                            <span
                              className={classNames(
                                selectedCurrency
                                  ? "font-semibold"
                                  : "font-normal",
                                "block truncate"
                              )}
                            >
                              {currency}
                            </span>
                            {selectedCurrency ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-primary",
                                  "absolute inset-y-0 left-0 flex items-center pl-1.5"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
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
  );
}
