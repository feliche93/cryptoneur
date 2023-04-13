'use client'

import {
  RowData,
  Table,
  TableOptions,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { fuzzyFilter } from './filter-functions'
import { TableCore } from './table-core'
import { TableFilters } from './table-filters'
import { TableResults } from './table-results'
import { useRouter } from 'next/navigation'

export interface TableProps<TData> {
  data: TData[]
  columns: TableOptions<TData>['columns']
  className?: string
  enableGlobalFilter?: boolean
  filterColumns?: string[]
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    routerRefresher: () => void
  }
}

export const TanstackTable = <TData,>({
  data,
  columns,
  enableGlobalFilter = true,
  filterColumns = [],
}: TableProps<TData>) => {
  const router = useRouter()
  const [defaultData, setDefaultData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState(
    // search?.toString() ||
    '',
  )

  // useEffect(() => {
  //   setDefaultData(data)
  // }, [data])

  const table: Table<TData> = useReactTable({
    columns,
    data: defaultData,
    meta: {
      routerRefresher: () => {
        router.refresh()
        console.log('routerRefreshed')
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    state: {
      globalFilter,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
      <TableFilters
        enableGlobalFilter={enableGlobalFilter}
        table={table}
        filterColumns={filterColumns}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <TableResults table={table} />
      <TableCore table={table} />

      {/* Debug Table State */}
      {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(table.getAllColumns(), null, 2)}</pre> */}
    </div>
  )
}
