import { Table } from '@tanstack/react-table'
import { FC } from 'react'

export interface TableResultsProps<T> {
  table: Table<T>
}
export const TableResults: FC<TableResultsProps<any>> = ({ table }) => {
  return (
    <div className="px-6 pt-8 sm:px-0">
      <p className="text-sm font-normal text-base-content">
        <span className="font-bold text-base-content">{table.getRowModel().rows.length}</span>{' '}
        Results displayed out of{' '}
        <span className="font-bold text-base-content">{table.getCoreRowModel().rows.length}</span>.
      </p>
    </div>
  )
}
