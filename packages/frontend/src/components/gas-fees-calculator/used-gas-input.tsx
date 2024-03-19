'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TGetTransactionTypesResponse } from '@/data/gas-fees-calculator'
import { createUrl } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from '../ui/input'

export const UsedGaseInput = ({ txnTypes }: { txnTypes: TGetTransactionTypesResponse }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const usedGasParam = searchParams?.get('usedGas') ?? ''
  const txnTypeParam = searchParams?.get('txnType') ?? ''

  const [usedGas, setUsedGas] = useState(usedGasParam)
  const [txnType, setTxnType] = useState(txnTypeParam)

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      if (!searchParams || !pathname) return

      const newUrlSearchParams = new URLSearchParams(searchParams)
      newUrlSearchParams.set('usedGas', value)
      newUrlSearchParams.set('txnType', 'Custom')
      router.push(createUrl(pathname, newUrlSearchParams), {
        scroll: false,
      })
    },
    // delay in ms
    1000,
  )

  useEffect(() => {
    setUsedGas(usedGasParam)
  }, [usedGasParam])

  useEffect(() => {
    setTxnType(txnTypeParam)
  }, [txnTypeParam])

  return (
    <>
      {/* <pre>
        {JSON.stringify(
          {
            usedGas,
            txnType,
            usedGasParam,
          },
          null,
          2,
        )}
      </pre> */}
      <Card className="grid grid-cols-1 sm:grid-cols-2 items-start">
        <CardHeader>
          <CardTitle>Used Gas</CardTitle>
          <CardDescription>
            Every transaction uses gas. Pick a common transaction type or enter a custom amount of
            gas used.
          </CardDescription>
        </CardHeader>
        <CardContent className="sm:pt-4 pt-0 flex flex-col gap-4">
          <div className="space-y-1">
            <Label>Transaction Type</Label>
            <Select
              onValueChange={(value: string) => {
                if (!searchParams || !pathname) return

                const newUrlSearchParams = new URLSearchParams(searchParams)

                const usedGas = txnTypes.find((txnType) => txnType.name === value)?.gas.toString()
                if (!usedGas) return

                newUrlSearchParams.set('usedGas', usedGas)
                newUrlSearchParams.set('txnType', value)

                router.push(createUrl(pathname, newUrlSearchParams), {
                  scroll: false,
                })
              }}
              value={txnType}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                {txnTypes.map((txnType) => (
                  <SelectItem key={txnType.id} value={txnType.name}>
                    {txnType.name}
                  </SelectItem>
                ))}
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Used Gas Input</Label>
            <Input
              value={usedGas}
              onChange={(e) => {
                const value = e.target.value
                setUsedGas(value)
                debounced(value)
              }}
              inputMode="numeric"
              placeholder="Enter the amount of used gas"
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
