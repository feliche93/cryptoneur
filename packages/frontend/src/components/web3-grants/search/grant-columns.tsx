'use client'

import { Grant } from '@app/[lang]/web3-grants/search/page'
import { DirectusImage } from '@components/shared/directus-image'
import { isWithinRange } from '@components/table/filter-functions'
import { TableCell } from '@components/table/table-cell'
import { TableHeader } from '@components/table/table-header'
import { buttonVariants } from '@components/ui/button'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { createColumnHelper } from '@tanstack/react-table'
import { currencyFormatter } from '@utils/helpers'
import Link from 'next/link'

export const grantColumnHelper = createColumnHelper<Grant>()
export const grantColumns = [
  grantColumnHelper.display({
    id: 'image',
    header: (info) => (
      <TableHeader
        isSorted={info.header.column.getIsSorted()}
        getToggleSortingHandler={info.header.column.getToggleSortingHandler()}
      ></TableHeader>
    ),
    cell: (info) => (
      <TableCell className="whitespace-normal">
        {info.cell.row.original.logo && (
          <DirectusImage
            id={info.cell.row.original.logo}
            className="aspect-square h-12 w-auto object-contain"
          />
        )}
      </TableCell>
    ),
    // filterFn: (rows, id, filterValue, meta) => isWithinRange(rows, id, filterValue, meta),
  }),
  grantColumnHelper.accessor('translations.name', {
    header: (info) => (
      <TableHeader
        isSorted={info.header.column.getIsSorted()}
        getToggleSortingHandler={info.header.column.getToggleSortingHandler()}
      >
        Grant Name
      </TableHeader>
    ),
    cell: (info) => <TableCell className="whitespace-normal">{info.cell.getValue()}</TableCell>,
    filterFn: (rows, id, filterValue, meta) => isWithinRange(rows, id, filterValue, meta),
  }),
  grantColumnHelper.accessor('grant_blockchains', {
    header: (info) => (
      <TableHeader
        isSorted={info.header.column.getIsSorted()}
        getToggleSortingHandler={info.header.column.getToggleSortingHandler()}
      >
        Supported Blockchains
      </TableHeader>
    ),
    cell: (info) => (
      <TableCell className="whitespace-normal">
        <>
          {info.cell.row.original.grant_blockchains.map((blockchain, index) => (
            <div key={index} className="flex flex-row space-y-4">
              <span className="text-sm">{blockchain.web3_blockchains_id.name}</span>
            </div>
          ))}
        </>
      </TableCell>
    ),
    filterFn: (rows, id, filterValue, meta) => isWithinRange(rows, id, filterValue, meta),
  }),
  grantColumnHelper.accessor('grant_use_cases', {
    header: (info) => (
      <TableHeader
        isSorted={info.header.column.getIsSorted()}
        getToggleSortingHandler={info.header.column.getToggleSortingHandler()}
      >
        Use Cases
      </TableHeader>
    ),
    cell: (info) => (
      <TableCell className="whitespace-normal">
        <>
          {info.cell.row.original.grant_use_cases.map((useCase, index) => (
            <div key={index} className="flex flex-row space-y-4">
              <span className="text-sm">{useCase.web3_use_cases_id.translations.name}</span>
            </div>
          ))}
        </>
      </TableCell>
    ),
    filterFn: (rows, id, filterValue, meta) => isWithinRange(rows, id, filterValue, meta),
  }),
  grantColumnHelper.accessor('funding_maximum', {
    header: (info) => (
      <TableHeader
        className="text-right"
        isSorted={info.header.column.getIsSorted()}
        getToggleSortingHandler={info.header.column.getToggleSortingHandler()}
      >
        Funding Minimum
      </TableHeader>
    ),
    cell: (info) => (
      <TableCell className="text-right">
        {info.cell.row.original.funding_minimum ? (
          <>
            {currencyFormatter({
              amount: info.cell.row.original.funding_minimum,
              currency: info.cell.row.original.funding_minimum_currency_id?.symbol,
              minimumFractionDigits: 2,
            })}
          </>
        ) : null}
      </TableCell>
    ),
    filterFn: (rows, id, filterValue, meta) => isWithinRange(rows, id, filterValue, meta),
  }),
  grantColumnHelper.accessor('funding_maximum', {
    header: (info) => (
      <TableHeader
        className="text-right"
        isSorted={info.header.column.getIsSorted()}
        getToggleSortingHandler={info.header.column.getToggleSortingHandler()}
      >
        Funding Maximum
      </TableHeader>
    ),
    cell: (info) => (
      <TableCell className="text-right">
        {info.cell.row.original.funding_maximum ? (
          <>
            {currencyFormatter({
              amount: info.cell.row.original.funding_maximum,
              currency: info.cell.row.original.funding_maximum_currency_id?.symbol,
              minimumFractionDigits: 2,
            })}
          </>
        ) : null}
      </TableCell>
    ),
    filterFn: (rows, id, filterValue, meta) => isWithinRange(rows, id, filterValue, meta),
  }),
  grantColumnHelper.display({
    id: 'detail',
    header: (info) => (
      <TableHeader
        isSorted={info.header.column.getIsSorted()}
        getToggleSortingHandler={info.header.column.getToggleSortingHandler()}
      ></TableHeader>
    ),
    cell: (info) => (
      <TableCell className="whitespace-normal">
        <Link
          // className={buttonVariants({
          //   variant: 'primary',
          //   size: 'sm',
          // })}
          href={info.cell.row.original.slug}
        >
          <ArrowTopRightOnSquareIcon className="text h-5 w-5 rounded-lg text-primary" />
        </Link>
      </TableCell>
    ),
    // filterFn: (rows, id, filterValue, meta) => isWithinRange(rows, id, filterValue, meta),
  }),
]
