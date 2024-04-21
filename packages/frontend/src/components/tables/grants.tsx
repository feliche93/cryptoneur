'use client'

import { DataTable } from '@/components/data-table/data-table'
import { TGetGrantsResponse, TGrant } from '@/data/grants'
import { useDataTable } from '@/hooks/use-data-table'
import { type ColumnDef } from '@tanstack/react-table'
import * as React from 'react'
import { fetchGrantsTableColumnDef, searchableColumns } from '../column-defs/grants'

interface CampaignsTableProps {
  dataPromise: Promise<TGetGrantsResponse>
}

export function GrantsTable({ dataPromise }: CampaignsTableProps) {
  // Learn more about React.use here: https://react.dev/reference/react/use
  const { grants } = React.use(dataPromise)

  const { data, pageCount } = grants

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<TGrant, unknown>[]>(() => fetchGrantsTableColumnDef(), [])

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    searchableColumns,
    // filterableColumns,
  })

  // Toggling some data-table states for demo
  const id = React.useId()
  const [advancedFilter, setAdvancedFilter] = React.useState(false)
  const [floatingBarContent, setFloatingBarContent] = React.useState<React.ReactNode | null>(null)

  let deleteCampaignLoadingToastId: string | number | undefined

  // const { execute: executeDeleteCampaign } = useAction(deleteCampaign, {
  //   onExecute: (input) => {
  //     deleteCampaignLoadingToastId = toast.loading('Deleting campaign...')
  //   },
  //   onError(error, input, reset) {
  //     toast.error('Failed to delete campaign', {
  //       id: deleteCampaignLoadingToastId,
  //     })
  //     reset()
  //   },
  //   onSuccess(data, input, reset) {
  //     toast.success('Campaign deleted', {
  //       id: deleteCampaignLoadingToastId,
  //     })
  //     reset()
  //   },
  // })

  return (
    <DataTable
      table={table}
      columns={columns}
      searchableColumns={searchableColumns}
      // filterableColumns={filterableColumns}
      advancedFilter={false}
      floatingBarContent={floatingBarContent}
      // deleteRowsAction={(event) => {
      //   event?.preventDefault()

      //   const selectedRows = table.getFilteredSelectedRowModel().rows as {
      //     original: TGrant
      //   }[]

      //   selectedRows.map((row) => executeDeleteCampaign({ campaignId: row.original.campaignId }))
      //   table.resetRowSelection()
      // }}
    />
  )
}
