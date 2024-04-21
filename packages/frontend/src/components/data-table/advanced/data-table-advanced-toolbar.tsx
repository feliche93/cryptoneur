'use client'

import * as React from 'react'

import { PlusIcon, SwitchIcon } from '@radix-ui/react-icons'
import type { Table } from '@tanstack/react-table'

import { DataTableAdvancedFilter } from '@/components/data-table/advanced/data-table-advanced-filter'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  TDataTableFilterOption,
  TDataTableFilterableColumn,
  TDataTableSearchableColumn,
} from '@/types'
import { DataTableAdvancedFilterItem } from './data-table-advanced-filter-item'
import { DataTableMultiFilter } from './data-table-multi-filter'

interface TDataTableAdvancedToolbarProps<TData> {
  table: Table<TData>
  searchableColumns?: TDataTableSearchableColumn<TData>[]
  filterableColumns?: TDataTableFilterableColumn<TData>[]
}

export function DataTableAdvancedToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
}: TDataTableAdvancedToolbarProps<TData>) {
  const [selectedOptions, setSelectedOptions] = React.useState<TDataTableFilterOption<TData>[]>([])
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (selectedOptions.length > 0) {
      setOpen(true)
    }
  }, [selectedOptions])

  const options: TDataTableFilterOption<TData>[] = React.useMemo(() => {
    const searchableOptions = searchableColumns.map((column) => ({
      id: crypto.randomUUID(),
      label: String(column.id),
      value: column.id,
      items: [],
    }))
    const filterableOptions = filterableColumns.map((column) => ({
      id: crypto.randomUUID(),
      label: column.title,
      value: column.id,
      items: column.options,
    }))

    return [...searchableOptions, ...filterableOptions]
  }, [filterableColumns, searchableColumns])

  return (
    <div className="w-full space-y-2.5 overflow-auto p-1">
      <div className="flex items-center justify-between space-x-2">
        <div className="flex flex-1 items-center space-x-2">
          {searchableColumns.length > 0 &&
            searchableColumns.map(
              (column) =>
                table.getColumn(column.id ? String(column.id) : '') && (
                  <Input
                    key={String(column.id)}
                    placeholder={column.placeholder}
                    value={(table.getColumn(String(column.id))?.getFilterValue() as string) ?? ''}
                    onChange={(event) =>
                      table.getColumn(String(column.id))?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                  />
                ),
            )}
        </div>
        <div className="flex items-center space-x-2">
          {selectedOptions.length > 0 || open ? (
            <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
              Filter
              <SwitchIcon
                className="ml-2 size-4 transition-transform"
                style={{
                  transform: `rotate(${open ? 180 : 0}deg)`,
                }}
                aria-hidden="true"
              />
            </Button>
          ) : (
            <DataTableAdvancedFilter
              options={options.filter(
                (option) =>
                  !selectedOptions.some((selectedOption) => selectedOption.value === option.value),
              )}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          )}
          <DataTableViewOptions table={table} />
        </div>
      </div>
      {open ? (
        <div className="flex items-center space-x-2">
          {selectedOptions.some((option) => option.isMulti) ? (
            <DataTableMultiFilter
              table={table}
              allOptions={options}
              options={selectedOptions.filter((option) => option.isMulti)}
              setSelectedOptions={setSelectedOptions}
            />
          ) : null}
          {selectedOptions
            .filter((option) => !option.isMulti)
            .map((selectedOption) => (
              <DataTableAdvancedFilterItem
                key={String(selectedOption.value)}
                table={table}
                selectedOption={selectedOption}
                setSelectedOptions={setSelectedOptions}
              />
            ))}
          <DataTableAdvancedFilter
            options={options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          >
            <Button variant="outline" size="sm" role="combobox" className="rounded-full">
              <PlusIcon className="mr-2 size-4 opacity-50" aria-hidden="true" />
              Add filter
            </Button>
          </DataTableAdvancedFilter>
        </div>
      ) : null}
    </div>
  )
}
