'use client'

import { createUrl } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

export const GasPriceRadio = ({}) => {
  const gasPriceOption = ['standard', 'fast', 'instant']

  const searchParams = useSearchParams()
  const pathanme = usePathname()
  const router = useRouter()

  return (
    <Card className="grid grid-cols-1 sm:grid-cols-2 items-end">
      <CardHeader>
        <CardTitle>Gas Price</CardTitle>
        <CardDescription>Select the transaction speed you want to use.</CardDescription>
      </CardHeader>
      <CardContent className="sm:pt-4 pt-0 space-y-1">
        <div className="flex flex-col space-y-3 w-full">
          <Label>Transaction Speed</Label>
          <RadioGroup
            className="flex flex-col sm:flex-row gap-3 sm:gap-12 w-44 justify-between"
            defaultValue={searchParams?.get('gasPrice') ?? 'standard'}
            onValueChange={(value) => {
              if (!searchParams || !pathanme) return

              const newSearchParams = new URLSearchParams(searchParams?.toString() ?? '')

              newSearchParams.set('gasPrice', value)
              router.push(createUrl(pathanme, newSearchParams), {
                scroll: false,
              })
            }}
          >
            {gasPriceOption.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label className="capitalize" htmlFor={option}>
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}
