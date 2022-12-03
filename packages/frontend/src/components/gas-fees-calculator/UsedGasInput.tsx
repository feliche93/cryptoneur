import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UsedGasInput({ usedGas, setUsedGas }) {
  const txnTypes = [
    { name: "Standard Transfer", gas: 21000 },
    { name: "ERC20: Transfer", gas: 65000 },
    { name: "ERC721: Transfer", gas: 84904 },
    { name: "USDT: Transfer", gas: 54128 },
    { name: "OpenSea: Sale", gas: 71645 },
    { name: "SuperRare: Sale", gas: 130704 },
    { name: "Rarible: Sale", gas: 245730 },
    { name: "LooksRare: Sale", gas: 326897 },
    { name: "SuperRare: Offer", gas: 85191 },
    { name: "Uniswap V3: Swap", gas: 184523 },
    { name: "SushiSwap: Swap", gas: 141225 },
    { name: "Curve: Swap", gas: 183758 },
    { name: "Balancer: Swap", gas: 196625 },
    { name: "Bancor: Swap", gas: 183193 },
    { name: "1inch: Swap", gas: 141905 },
    { name: "KyberSwap: Swap", gas: 144389 },
    { name: "Uniswap V2: Swap", gas: 152809 },
    { name: "CoW Protocol: Swap", gas: 343353 },
    { name: "Uniswap V3: Add Liquidity", gas: 216912 },
    { name: "Curve: Add Liquidity", gas: 271909 },
    { name: "ENS: Register Domain", gas: 266996 },
    { name: "Arbitrum: Deposit", gas: 91101 },
    { name: "Optimism: Deposit", gas: 150829 },
    { name: "Polygon: Deposit", gas: 149208 },
    { name: "Ronin: Deposit", gas: 163754 },
    { name: "zkSync: Deposit", gas: 143430 },
    { name: "Beacon Chain: Deposit", gas: 52933 },
    { name: "Ribbon Finance: Deposit", gas: 93014 },
    { name: "Ribbon Finance: Withdraw", gas: 98895 },
    { name: "dYdX: Borrow", gas: 174271 },
    { name: "MakerDAO: Borrow", gas: 233329 },
    { name: "Compound: Collect", gas: 1239371 },
    { name: "Compound: Borrow", gas: 340168 },
    { name: "Compound: Repay", gas: 112338 },
    { name: "KyberSwap: Stake", gas: 214835 },
    { name: "Tornado.Cash: Deposit", gas: 1014025 },
    { name: "Tornado.Cash: Withdraw", gas: 360831 },
    { name: "0x: Swap", gas: 327259 },
    { name: "Aave: Borrow", gas: 318788 },
    { name: "Aave: Repay", gas: 199772 },
    { name: "Convex Finance: Stake", gas: 514772 },
    { name: "Lido: Stake", gas: 82685 },
    { name: "Yearn Finance: Deposit", gas: 216306 },
    { name: "Hop Protocol: Bridge", gas: 121565 },
    { name: "Multichain: Bridge", gas: 57887 },
    { name: "Across Protocol: Bridge", gas: 120965 },
    { name: "Synapse: Bridge", gas: 107905 },
    { name: "Lido: Stake", gas: 87614 },
    { name: "Gem: Batch Buy", gas: 340926 },
    { name: "L2: Deposits", gas: 250000 },
    { name: "Gnosis Safe: Creation with 2 Owners", gas: 307126 },
    { name: "Gnosis Safe: Creation with 3 Owners", gas: 331341 },
    { name: "Gnosis Safe: Creation with 4 Owners", gas: 355556 },
    { name: "Custom Type", gas: usedGas },
  ];

  const [selectedTxnType, setSelectedTxnType] = useState(txnTypes[0]);

  function handleGasInputChange(event) {
    setUsedGas(event.target.value);
    setSelectedTxnType(
      txnTypes.find((txnType) => txnType.name === "Custom Type")
    );
    // router.push(
    //   `/gas-fees-calculator/${currency}${gas !== undefined ? "/" + gas : ""}${
    //     txnSpeed !== undefined ? "/" + txnSpeed !== undefined : ""
    //   }`
    // );
  }

  function handleTxnTypeChange(event) {
    setSelectedTxnType(event);
    // console.log(event.gas);
    setUsedGas(event.gas);
    // router.push(
    //   `/gas-fees-calculator/${currency}${gas !== undefined ? "/" + gas : ""}${
    //     txnSpeed !== undefined ? "/" + txnSpeed !== undefined : ""
    //   }`
    // );
  }

  return (
    <>
      <div className="col-span-1 sm:col-span-1">
        <Listbox value={selectedTxnType} onChange={handleTxnTypeChange}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">
                Transaction Type
              </Listbox.Label>
              <div className="mt-1 relative">
                <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <span className="block truncate">{selectedTxnType.name}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-600"
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
                    {txnTypes.map((txn, i) => (
                      <Listbox.Option
                        key={i}
                        className={({ active }) =>
                          classNames(
                            active ? "text-white bg-blue-600" : "text-gray-900",
                            "cursor-default select-none relative py-2 pl-3 pr-9"
                          )
                        }
                        value={txn}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {txn.name}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-blue-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
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
        <label
          htmlFor="gas-input"
          className="pt-4 block text-sm font-medium text-gray-700"
        >
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
  );
}
