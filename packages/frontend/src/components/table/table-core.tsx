import { flexRender, Table } from '@tanstack/react-table'
import { FC, Fragment } from 'react'

export interface TableCoreProps<T> {
  table: Table<T>
}
export const TableCore: FC<TableCoreProps<any>> = ({ table }) => {
  return (
    <div className="mt-2 flow-root">
      <div className="overflow-x-auto ">
        <div className="inline-block min-w-full py-2 align-middle">
          <div className="overflow-hidden shadow ring-1 ring-base-300 ring-opacity-40 sm:rounded-lg">
            <table className="min-w-full divide-y divide-primary/80">
              <thead className="bg-base-300 align-bottom">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Fragment key={header.id}>
                        {header.isPlaceholder ? null : (
                          <>{flexRender(header.column.columnDef.header, header.getContext())}</>
                        )}
                      </Fragment>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-base-300 bg-base-100">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <Fragment key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
