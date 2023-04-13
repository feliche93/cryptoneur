'use client'

import { Grant } from '@app/[lang]/web3-grants/search/page'
import { isWithinRange } from '@components/table/filter-functions'
import { TableCell } from '@components/table/table-cell'
import { TableHeader } from '@components/table/table-header'
import { ArrowTopRightOnSquareIcon, BanknotesIcon } from '@heroicons/react/24/outline'
import { getAssetUrl } from '@lib/utils'
import { createColumnHelper } from '@tanstack/react-table'
import { currencyFormatter } from '@utils/helpers'
import Image from 'next/image'
import Link from 'next/link'

export const grantColumnHelper = createColumnHelper<Grant>()
export const grantColumns = [
  grantColumnHelper.display({
    id: 'image',
    header: (info) => (
      <TableHeader
        isSorted={info.header.column.getIsSorted()}
        getToggleSortingHandler={info.header.column.getToggleSortingHandler()}
      >
        {' '}
      </TableHeader>
    ),
    cell: (info) => (
      <TableCell className="w-40">
        <Image
          src={getAssetUrl(info.cell.row.original.logo)}
          alt={info.cell.row.original.translations.name}
          width={100}
          height={100}
        />
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
    cell: (info) => (
      <TableCell className="whitespace-normal">
        <Link className="link" href={`/web3-grants/${info.cell.row.original.slug}`}>
          {info.cell.getValue()}
        </Link>
      </TableCell>
    ),
    filterFn: (rows, id, filterValue, meta) => isWithinRange(rows, id, filterValue, meta),
  }),
  grantColumnHelper.accessor('grant_categories', {
    header: (info) => (
      <TableHeader
        isSorted={info.header.column.getIsSorted()}
        getToggleSortingHandler={info.header.column.getToggleSortingHandler()}
      >
        Category
      </TableHeader>
    ),
    cell: (info) => (
      <TableCell className="whitespace-normal">
        <>
          {info.cell.row.original.grant_categories.map((category, index) => (
            <div key={`${index}-${info.row.original.id}`} className="flex flex-row space-y-4">
              <span className="text-sm">{category}</span>
            </div>
          ))}
        </>
      </TableCell>
    ),
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
            <div key={`${index}-${info.row.original.id}`} className="flex flex-row space-y-4">
              <span className="text-sm">{blockchain}</span>
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
            <div key={`${index}-${info.row.original.id}`} className="flex flex-row space-y-4">
              <span className="text-sm">{useCase}</span>
            </div>
          ))}
        </>
      </TableCell>
    ),
    filterFn: (rows, id, filterValue, meta) => isWithinRange(rows, id, filterValue, meta),
  }),
  grantColumnHelper.accessor('rfps', {
    header: (info) => (
      <TableHeader
        className="text-right"
        isSorted={info.header.column.getIsSorted()}
        getToggleSortingHandler={info.header.column.getToggleSortingHandler()}
      >
        Rfps
      </TableHeader>
    ),
    cell: (info) => <TableCell className="text-right">{info.cell.row.original.rfps}</TableCell>,
    filterFn: (rows, id, filterValue, meta) => isWithinRange(rows, id, filterValue, meta),
  }),
  grantColumnHelper.accessor('funding_minimum', {
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
          href={`/web3-grants/${info.cell.row.original.slug}`}
        >
          <ArrowTopRightOnSquareIcon className="text h-5 w-5 rounded-lg text-primary" />
        </Link>
      </TableCell>
    ),
    // filterFn: (rows, id, filterValue, meta) => isWithinRange(rows, id, filterValue, meta),
  }),
  grantColumnHelper.display({
    id: 'mobile',
    header: (info) => <TableHeader type={'mobile'}>Transactions</TableHeader>,
    cell: (info) => (
      <TableCell type={'mobile'}>
        <div className="flex flex-row justify-between p-4">
          {/* Grouping image and info */}
          <div className="flex flex-row items-start space-x-4">
            <Image
              src={getAssetUrl(info.cell.row.original.logo)}
              alt={info.cell.row.original.translations.name}
              width={40}
              height={40}
            />
            <div className="space-y-2">
              {/* Fourth Name Row */}
              <div className="text-sm text-base-content">
                {info.cell.row.original.translations.name}
              </div>

              {/* Categories row */}
              <div className="flex flex-row flex-wrap gap-1">
                {info.cell.row.original.grant_categories.map((category, index) => (
                  <div key={`${index}-${info.row.original.id}`} className="badge-accent badge">
                    <span className="text-sm">{category}</span>
                  </div>
                ))}
              </div>

              {/* Blockchains row */}
              <div className="flex flex-row flex-wrap gap-1">
                {info.cell.row.original.grant_blockchains.map((blockchain, index) => (
                  <div key={`${index}-${info.row.original.id}`} className="badge-primary badge">
                    <span className="text-sm">{blockchain}</span>
                  </div>
                ))}
              </div>

              {/* Use Cases Row */}
              <div className="flex flex-row flex-wrap gap-1">
                {info.cell.row.original.grant_use_cases.map((useCase, index) => (
                  <div key={`${index}-${info.row.original.id}`} className="badge-secondary badge">
                    <span className="text-sm">{useCase}</span>
                  </div>
                ))}
              </div>

              {/* Funding Row */}
              <div className="text-primary">
                <div className="flex items-center">
                  {info.cell.row.original?.funding_minimum &&
                  info.cell.row.original?.funding_maximum ? (
                    <>
                      <BanknotesIcon
                        className="mr-2 h-4 w-4 text-base-content/80"
                        aria-hidden="true"
                      />
                      <span className="text-xl font-bold text-base-content">
                        {`${currencyFormatter({
                          amount: info.cell.row.original.funding_minimum,
                          currency: info.cell.row.original?.funding_minimum_currency_id?.symbol,
                          minimumFractionDigits: 0,
                        })} - ${currencyFormatter({
                          amount: info.cell.row.original.funding_maximum,
                          currency: info.cell.row.original?.funding_maximum_currency_id?.symbol,
                          minimumFractionDigits: 0,
                        })}`}
                      </span>
                    </>
                  ) : info.cell.row.original?.funding_minimum ? (
                    <>
                      <BanknotesIcon
                        className="mr-2 h-4 w-4 text-base-content/80"
                        aria-hidden="true"
                      />
                      <span className="text-xl font-bold text-base-content">
                        {`> ${currencyFormatter({
                          amount: info.cell.row.original.funding_minimum,
                          currency: info.cell.row.original?.funding_minimum_currency_id?.symbol,
                          minimumFractionDigits: 0,
                        })}`}
                      </span>
                    </>
                  ) : info.cell.row.original?.funding_maximum ? (
                    <>
                      <BanknotesIcon
                        className="mr-2 h-4 w-4 text-base-content/80"
                        aria-hidden="true"
                      />
                      <span className="text-xl font-bold text-base-content">
                        {`< ${currencyFormatter({
                          amount: info.cell.row.original.funding_maximum,
                          currency: info.cell.row.original?.funding_maximum_currency_id?.symbol,
                          minimumFractionDigits: 0,
                        })}`}
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Info Button */}
          <div className="px-2">
            <Link href={`/web3-grants/${info.cell.row.original.slug}`}>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 text-primary" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </TableCell>
    ),
  }),
]
