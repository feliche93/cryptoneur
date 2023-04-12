'use client'


import { ColumnDef, Table } from '@tanstack/react-table'
import { Dispatch, FC, SetStateAction } from 'react'
import { DebouncedInput } from './debounced-input'
import { Filter } from './filter'

export interface TableFilterProps<T> {
  table: Table<T>
  globalFilter: string
  setGlobalFilter: Dispatch<SetStateAction<string>>
  minMaxFilter?: [ColumnDef<T>]
  enableGlobalFilter?: boolean
  filterColumns?: string[]
}
export const TableFilters: FC<TableFilterProps<any>> = ({
  table,
  globalFilter,
  setGlobalFilter,
  enableGlobalFilter,
  filterColumns = [],
}) => {
  // console.log('columns', table.getAllColumns())

  let filteredColumns = []

  for (const column of filterColumns) {
    const filteredColumn = table.getColumn(column)
    if (filteredColumn) {
      filteredColumns.push(filteredColumn)
    }
  }

  // console.log({ filteredColumns })

  if (filterColumns.length === 0 && !enableGlobalFilter) return null

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-0">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {/* Search */}
        {enableGlobalFilter && (
          <DebouncedInput
            className="sm:col-span-2 md:col-span-4 lg:col-span-3"
            primaryLabel="Search"
            value={globalFilter ?? ''}
            onChange={(value) => {
              setGlobalFilter(String(value ?? ''))
            }}
            placeholder="Search all columns..."
          />
        )}
        {/* Dummy element to push rows down in large screen */}
        <div className="col-span-3 hidden lg:inline" />
        <>
          {filteredColumns.map((column, index) => (
            <Filter
              key={index}
              className="sm:col-span-1 md:col-span-2 lg:col-span-3"
              column={column}
              table={table}
            />
          ))}
        </>
      </div>
      <div className="flex flex-col items-end space-x-0 space-y-2 pt-4 sm:flex-row sm:space-x-2 sm:space-y-0 md:col-span-1">
        <button
          onClick={() => {
            table.resetColumnFilters()
            table.resetGlobalFilter()
          }}
          className="btn-primary btn w-full sm:w-fit"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
