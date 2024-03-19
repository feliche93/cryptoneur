'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { TGetNetworkPricesResponse } from '@/lib/gas-fees-calculator'
import { FC } from 'react'
import { Badge } from '../ui/badge'

export interface TableProps {
  networkPrices: TGetNetworkPricesResponse
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
  const searchParams = useSearchParams()

  const currency = searchParams?.get('currency') ?? 'USD'
  const gasPrice = searchParams?.get('gasPrice') ?? 'standard'
  const usedGas = Number(searchParams?.get('usedGas')) ?? 21000

  return (
    <div className="mt-8 flex flex-col">
      {/* Desktop */}
      <div className="-my-2 -mx-4 hidden overflow-x-auto sm:-mx-6 sm:block lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-muted md:rounded-lg">
            <table className="min-w-full divide-y divide-muted">
              <thead className="bg-card">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-6"
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
                {networkPrices.map((network) => {
                  return (
                    <tr key={network?.website}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <Image
                              className="h-10 w-10 bg-background dark:bg-primary rounded-lg p-1 object-contain"
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
                              className="text-muted-foreground hover:text-primary"
                            >
                              {network?.website}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                        <Badge variant={'outline'}>{network?.type}</Badge>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-foreground">
                        <div className="text-sm font-semibold text-base-content">
                          {network.symbol}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {network.tokenPrice[currency?.toLocaleLowerCase() ?? '']}{' '}
                          {currency ?? 'DefaultCurrency'}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm ">{usedGas}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="text-sm font-semibold capitalize text-base-content">
                          {gasPrice}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {network.gasPrice[gasPrice as keyof typeof network.gasPrice]}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-base-content">
                        {(
                          (network.tokenPrice[currency.toLocaleLowerCase()] *
                            usedGas *
                            Number(network.gasPrice[gasPrice as keyof typeof network.gasPrice])) /
                          10 ** 9
                        ).toFixed(4)}{' '}
                        {currency}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <table className="mx-auto block divide-y divide-muted overflow-hidden shadow ring-muted md:rounded-lg sm:hidden">
        <thead className="bg-card">
          <tr>
            <th
              scope="col"
              className="py-3 text-left text-xs font-bold uppercase tracking-wider text-foreground"
            >
              Calculation
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-base-300 bg-base-100">
          {networkPrices.map((network) => (
            <tr key={network.website}>
              <td className="px-2 py-4">
                <div className="grid grid-cols-2 gap-2 items-start">
                  {/* Image and Network */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Image
                        src={network.image}
                        alt={network.name}
                        width={50}
                        height={50}
                        className="aspect-square object-contain dark:bg-primary dark:p-1 rounded-lg"
                      ></Image>
                    </div>
                    <div className="ml-4 space-y-2">
                      <div className="text-sm font-medium">{network.name}</div>
                      <Badge variant={'outline'}>{network.type}</Badge>
                    </div>
                  </div>
                  {/* Calculation Details */}
                  <div className="space-y-1">
                    <div className="px-2 text-left text-sm capitalize text-muted-foreground">
                      {network.symbol}{' '}
                      <span className="font-semibold text-foreground">
                        {network.tokenPrice[currency.toLocaleLowerCase()].toFixed(2)} {currency}
                      </span>
                    </div>
                    <div className="px-2 text-sm capitalize text-muted-foreground">
                      Gas Price{' '}
                      <span className="font-semibold text-foreground">
                        {network.gasPrice[gasPrice as keyof typeof network.gasPrice]}
                      </span>
                    </div>
                    <div className="px-2 text-sm capitalize text-muted-foreground">
                      Gas Used <span className="font-semibold text-foreground">{usedGas}</span>
                    </div>
                    <div className="max-h-fit max-w-fit rounded-full border border-primary bg-primary px-2 py-1 text-sm uppercase text-primary-foreground">
                      Cost{' '}
                      <span className="font-semibold text-primary-foreground">
                        {(
                          (network.tokenPrice[currency.toLocaleLowerCase()] *
                            usedGas *
                            Number(network.gasPrice[gasPrice as keyof typeof network.gasPrice])) /
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
