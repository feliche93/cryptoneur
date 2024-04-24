'use client'

import { DataTable } from '@/components/data-table/data-table'
import { TGetGrantsResponse, TGrant } from '@/data/grants'
import { useDataTable } from '@/hooks/use-data-table'
import { DataTableFilterField } from '@/types'
import * as React from 'react'
import { getColumns } from '../column-defs/grants'
import { DataTableToolbar } from '../data-table/data-table-toolbar'

interface CampaignsTableProps {
  dataPromise: Promise<TGetGrantsResponse>
}

export function GrantsTable({ dataPromise }: CampaignsTableProps) {
  // Learn more about React.use here: https://react.dev/reference/react/use
  const { grants, cachedBlockchainOptions, cachedUseCasesOptions, cachedCategoriesOptions } =
    React.use(dataPromise)

  const { data, pageCount } = grants

  const filterFields: DataTableFilterField<TGrant>[] = [
    {
      label: 'Grant Name',
      value: 'grantName',
      placeholder: 'Filter grant names...',
    },
    {
      label: 'Blockchain',
      value: 'grantBlockchainNames',
      options: cachedBlockchainOptions,
    },
    {
      label: 'Use Case',
      value: 'grantUseCaseNames',
      options: cachedUseCasesOptions,
    },
    {
      label: 'Category',
      value: 'grantCategoryNames',
      options: cachedCategoriesOptions,
    },
  ]

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), [])
  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    // optional props
    filterFields,
    // enableAdvancedFilter: featureFlags.includes("advancedFilter"),
    defaultPerPage: 10,
    defaultSort: 'grantName.asc',
  })

  return (
    <div className="w-full space-y-4 overflow-auto">
      <DataTableToolbar table={table} filterFields={filterFields}>
        {/* <TasksTableToolbarActions table={table} /> */}
      </DataTableToolbar>
      <DataTable
        table={table}
        // floatingBar={
        //   featureFlags.includes('floatingBar') ? (
        //     <TasksTableFloatingBar table={table} />
        //   ) : null
        // }
      />
    </div>
  )
}
