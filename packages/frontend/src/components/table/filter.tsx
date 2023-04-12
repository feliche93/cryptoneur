'use client'

import { Column, Table } from '@tanstack/react-table'
import clsx from 'clsx'
import { useMemo } from 'react'
import lodash from 'lodash'
import { DebouncedInput } from './debounced-input'

interface FilterProps {
  column: Column<any, unknown>
  className?: string
  table: Table<any>
}

interface DateFilterProps extends Pick<FilterProps, 'className' | 'column'> {
  minDate: string
  maxDate: string
  columnFilterValue: [string, string]
}

interface NumberFilterProps extends Pick<FilterProps, 'className' | 'column'> {
  minMaxValues: [number, number]
  columnFilterValue: [number, number]
}

interface TextFilterProps extends Pick<FilterProps, 'className' | 'column'> {
  sortedUniqueValues: any[]
}

function findFirstNonNullValue(column: Column<any, unknown>, table: Table<any>) {
  const flatRows = table.getPreFilteredRowModel().flatRows
  for (const row of flatRows) {
    const value = row.getValue(column.id)
    if (value !== null) {
      return value
    }
  }
  return null
}

function DateFilter({ column, className, minDate, maxDate, columnFilterValue }: DateFilterProps) {
  return (
    <div className={clsx(className)}>
      <div className="grid grid-cols-2 gap-x-2">
        <DebouncedInput
          primaryLabel="Start Date"
          type="date"
          min={minDate}
          max={maxDate}
          value={columnFilterValue?.[0] ?? minDate}
          onChange={(value) => {
            column.setFilterValue((old: [string, string]) => [value, old?.[1]])
          }}
          placeholder={`Min ${minDate ? `(${minDate})` : ''}`}
          className="col-span-1"
        />
        <DebouncedInput
          primaryLabel="End Date"
          type="date"
          min={minDate}
          max={maxDate}
          value={columnFilterValue?.[1] ?? maxDate}
          onChange={(value) => column.setFilterValue((old: [string, string]) => [old?.[0], value])}
          placeholder={`Max ${maxDate ? `(${maxDate})` : ''}`}
          className="col-span-1"
        />
      </div>
    </div>
  )
}

function NumberFilter({ column, className, minMaxValues, columnFilterValue }: NumberFilterProps) {
  const min = Number(minMaxValues?.[0] ?? '')
  const max = Number(minMaxValues?.[1] ?? '')

  // column.setFilterValue((old: [number, number]) => [0, 150])
  // return null

  return (
    <div className={clsx(className)}>
      <div className="grid grid-cols-2 gap-x-2">
        <DebouncedInput
          primaryLabel={`Min ${column?.id?.replace(/_/g, ' ')}`}
          type="number"
          min={min}
          max={max}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [Number(value), old?.[1]])
          }
          placeholder={`Min ${min ? `(${min})` : ''}`}
          className="col-span-1"
        />
        <DebouncedInput
          primaryLabel={`Max ${column?.id?.replace(/_/g, ' ')}`}
          type="number"
          min={min}
          max={max}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], Number(value)])
          }
          placeholder={`Max ${max ? `(${max})` : ''}`}
          className="col-span-1"
        />
      </div>
    </div>
  )
}

function isValidDate(dateString: string): boolean {
  const iso8601Pattern =
    /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?$/

  return iso8601Pattern.test(dateString)
}

export function Filter({ column, table, className }: FilterProps) {
  const firstValue = findFirstNonNullValue(column, table)

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  )

  const columnFilterValue = column.getFilterValue()

  if (typeof firstValue === 'number') {
    return (
      <div className={clsx(className)}>
        <div className="grid grid-cols-2 gap-x-2">
          <DebouncedInput
            primaryLabel={`Min ${column?.id?.replace(/_/g, ' ')}`}
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [value, old?.[1]])
            }
            placeholder={`Min ${
              column.getFacetedMinMaxValues()?.[0]
                ? `(${column.getFacetedMinMaxValues()?.[0]})`
                : ''
            }`}
            className="col-span-1"
          />
          <DebouncedInput
            primaryLabel={`Max ${column?.id?.replace(/_/g, ' ')}`}
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [old?.[0], value])
            }
            placeholder={`Max ${
              column.getFacetedMinMaxValues()?.[1]
                ? `(${column.getFacetedMinMaxValues()?.[1]})`
                : ''
            }`}
            className="col-span-1"
          />
        </div>
      </div>
    )
  }

  if (typeof firstValue === 'string' && isValidDate(firstValue)) {
    return (
      <div className={clsx(className)}>
        <div className="grid grid-cols-2 gap-x-2">
          <DebouncedInput
            primaryLabel={`Min ${column?.id?.replace(/_/g, ' ')}`}
            type="date"
            // min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            // max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(value) => {
              column.setFilterValue((old: [string, string]) => [value, old?.[1]])
            }}
            placeholder={`Min ${
              column.getFacetedMinMaxValues()?.[0]
                ? `(${column.getFacetedMinMaxValues()?.[0]})`
                : ''
            }`}
            className="col-span-1"
          />
          <DebouncedInput
            primaryLabel={`Max ${column?.id?.replace(/_/g, ' ')}`}
            type="date"
            // min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            // max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(value) =>
              column.setFilterValue((old: [number, number]) => [old?.[0], value])
            }
            placeholder={`Max ${
              column.getFacetedMinMaxValues()?.[1]
                ? `(${column.getFacetedMinMaxValues()?.[1]})`
                : ''
            }`}
            className="col-span-1"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="sm:col-span-1 md:col-span-2 lg:col-span-3">
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        primaryLabel={`Filter ${lodash.startCase(column.id)}`}
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        list={column.id + 'list'}
      />
    </div>
  )
}
