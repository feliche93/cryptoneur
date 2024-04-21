'use client'

import { CaretSortIcon, ChevronDownIcon, PlusIcon, TextIcon } from '@radix-ui/react-icons'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { TDataTableFilterOption } from '@/types'

interface DataTableAdvancedFilterProps<TData> {
  options: TDataTableFilterOption<TData>[]
  selectedOptions: TDataTableFilterOption<TData>[]
  setSelectedOptions: React.Dispatch<React.SetStateAction<TDataTableFilterOption<TData>[]>>
  children?: React.ReactNode
}

export function DataTableAdvancedFilter<TData>({
  options,
  selectedOptions,
  setSelectedOptions,
  children,
}: DataTableAdvancedFilterProps<TData>) {
  const [value, setValue] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [selectedOption, setSelectedOption] = React.useState<
    TDataTableFilterOption<TData> | undefined
  >(options[0])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children ?? (
          <Button variant="outline" size="sm" role="combobox" className="capitalize">
            Filter
            <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" aria-hidden="true" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="end">
        <Command>
          <CommandInput placeholder="Filter by..." />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={String(option.value)}
                  className="capitalize"
                  value={String(option.value)}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                    setSelectedOption(option)
                    setSelectedOptions((prev) => {
                      if (currentValue === value) {
                        return prev.filter((item) => item.value !== option.value)
                      } else {
                        return [...prev, option]
                      }
                    })
                  }}
                >
                  {option.items.length > 0 ? (
                    <ChevronDownIcon className="mr-2 size-4" aria-hidden="true" />
                  ) : (
                    <TextIcon className="mr-2 size-4" aria-hidden="true" />
                  )}
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  setSelectedOptions([
                    ...selectedOptions,
                    {
                      id: crypto.randomUUID(),
                      label: String(selectedOption?.label),
                      value: String(selectedOption?.value),
                      items: selectedOption?.items ?? [],
                      isMulti: true,
                    },
                  ])
                }}
              >
                <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                Advanced filter
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
