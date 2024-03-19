'use client'

import { usePathname } from '@/app/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TGetCurrenciesResponse } from '@/data/gas-fees-calculator'
import { createUrl } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CurrencyInput({ currencies }: { currencies: TGetCurrenciesResponse }) {
  const pathanme = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const currency = searchParams?.get('currency')

  const newSearchParams = new URLSearchParams(searchParams?.toString() ?? '')

  return (
    <>
      <Card className="grid grid-cols-1 sm:grid-cols-2 items-end">
        <CardHeader>
          <CardTitle>Local Currency</CardTitle>
          <CardDescription>
            Select the currency you want the fees to be displayed in.
          </CardDescription>
        </CardHeader>
        <CardContent className="sm:pt-4 pt-0 space-y-1">
          <Label>Currency</Label>
          <Select
            onValueChange={(value) => {
              if (value) {
                newSearchParams.set('currency', value)
              }
              router.push(createUrl(pathanme, newSearchParams), {
                scroll: false,
              })
            }}
            defaultValue={currency ?? 'USD'}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.id} value={currency.symbol}>
                  {currency.name} ({currency.sign})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </>
  )
}
