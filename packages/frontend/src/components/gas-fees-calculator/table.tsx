'use client'

import clsx from 'clsx'
import Image from 'next/image'

import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

export interface TableProps {
  networkPrices: any
  labelHeaderName: string
  labelHeaderType: string
  labelHeaderToken: string
  labelHeaderGasUsed: string
  labelHeaderGasPrice: string
  labelHeaderGasCurrentCost: string
}
export const Table: FC<TableProps> = ({
  networkPrices,
  labelHeaderName,
  labelHeaderType,
  labelHeaderToken,
  labelHeaderGasUsed,
  labelHeaderGasPrice,
  labelHeaderGasCurrentCost,
}) => {
  const { watch } = useFormContext()

  const { currency, gasPrice, usedGas } = watch()

  return (
    <div className="mt-8 flex flex-col">
      {/* Desktop */}
      <div className="-my-2 -mx-4 hidden overflow-x-auto sm:-mx-6 sm:block lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-base-300">
              <thead className="bg-base-300">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-base-content sm:pl-6"
                  >
                    {labelHeaderName}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-base-content"
                  >
                    {labelHeaderType}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-base-content"
                  >
                    {labelHeaderToken}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-base-content"
                  >
                    {labelHeaderGasUsed}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-base-content"
                  >
                    {labelHeaderGasUsed}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-base-content"
                  >
                    {labelHeaderGasCurrentCost}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300 bg-base-100">
                {networkPrices.map((network) => (
                  <tr key={network?.website}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <Image
                            className="h-10 w-10 object-contain"
                            src={network.image}
                            height={40}
                            width={40}
                            alt={network.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-base-content">{network?.name}</div>
                          <a
                            target={'_blank'}
                            href={network?.website}
                            rel="noopener noreferrer"
                            className="text-base-content/80 hover:text-primary"
                          >
                            {network?.website}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-base-content/80">
                      <span
                        className={clsx(
                          network.type === 'Layer 1'
                            ? 'bg-accent text-accent-content'
                            : network.type === 'Sidechain'
                            ? 'bg-primary text-primary-content'
                            : 'bg-secondary text-secondary-content',
                          'inline-flex rounded-full px-2 text-xs font-semibold leading-5',
                        )}
                      >
                        {network?.type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-base-content/80">
                      <div className="text-sm font-semibold text-base-content">
                        {network.symbol}
                      </div>
                      <div className="text-sm text-base-content/80">
                        {network.tokenPrice[currency.toLocaleLowerCase()]} {currency}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm ">{usedGas}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-base-content/80">
                      <div className="text-sm font-semibold capitalize text-base-content">
                        {gasPrice}
                      </div>
                      <div className="text-sm text-base-content/80">
                        {network.gasPrice[gasPrice]}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-base-content">
                      {(
                        (network.tokenPrice[currency.toLocaleLowerCase()] *
                          usedGas *
                          network.gasPrice[gasPrice]) /
                        10 ** 9
                      ).toFixed(4)}{' '}
                      {currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <table className="mx-auto block divide-y divide-base-300 sm:hidden">
        <thead className="rounded-lg bg-base-300">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-base-content/80"
            >
              Calculation
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-base-300 bg-base-100">
          {networkPrices.map((network) => (
            <tr key={network.website}>
              <td className="px-2 py-4">
                <div className="grid grid-cols-2 gap-2">
                  {/* Image and Network */}
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Image
                        src={network.image}
                        alt={network.name}
                        width={50}
                        height={50}
                        className="aspect-square object-contain"
                      ></Image>
                    </div>
                    <div className="ml-4 space-y-2">
                      <div className="text-sm font-medium text-base-content">{network.name}</div>
                      <span
                        className={clsx(
                          network.type === 'Layer 1'
                            ? 'bg-accent text-accent-content'
                            : network.type === 'Sidechain'
                            ? 'bg-primary text-primary-content'
                            : 'bg-secondary text-secondary-content',
                          'inline-flex rounded-full px-2 text-xs font-semibold leading-5',
                        )}
                      >
                        {network.type}
                      </span>
                    </div>
                  </div>
                  {/* Calculation Details */}
                  <div className="space-y-1">
                    <div className="px-2 text-left text-sm uppercase text-base-content">
                      {network.symbol}{' '}
                      <span className="font-semibold">
                        {network.tokenPrice[currency.toLocaleLowerCase()].toFixed(2)} {currency}
                      </span>
                    </div>
                    <div className="px-2 text-sm uppercase text-base-content">
                      Gas Price <span className="font-semibold">{network.gasPrice[gasPrice]}</span>
                    </div>
                    <div className="px-2 text-sm uppercase text-base-content">
                      Gas Used <span className="font-semibold">{usedGas}</span>
                    </div>
                    <div className="max-h-fit max-w-fit rounded-full border border-primary bg-primary/10 px-2 py-1 text-sm uppercase text-base-content">
                      Cost{' '}
                      <span className="font-semibold">
                        {(
                          (network.tokenPrice[currency.toLocaleLowerCase()] *
                            usedGas *
                            network.gasPrice[gasPrice]) /
                          10 ** 9
                        ).toFixed(4)}{' '}
                        {currency}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
