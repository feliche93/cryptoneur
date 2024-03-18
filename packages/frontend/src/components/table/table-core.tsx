import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { Table, flexRender } from '@tanstack/react-table'
import { FC, Fragment } from 'react'

export interface TableCoreProps<T> {
  table: Table<T>
}
export const TableCore: FC<TableCoreProps<any>> = ({ table }) => {
  return (
    <>
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
      {/* Pagination */}
      <div className="flex flex-col items-center justify-center gap-2 space-y-2 pt-4 sm:flex-row sm:space-y-0 sm:pt-4">
        <div className="flex items-center justify-center gap-4 sm:gap-2">
          <button
            className="rounded bg-base-100 p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronDoubleLeftIcon className="h-5 w-5" />
          </button>
          <button
            className="rounded border bg-base-100 p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            className="rounded border bg-base-100 p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
          <button
            className="rounded border bg-base-100 p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronDoubleRightIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="flex items-center gap-1">
            <div className="text-base-content/80">Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-2 text-base-content/80">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="input w-20 text-center"
            />
          </span>
        </div>
        <div className="gap-0">
          <select
            className="select"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* <div>{table.getRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
    </>
  )
}
