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
      <TableCell className="">
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
            <div key={`${index}-${info.row.original.id}`} className="flex flex-row space-y-4">
              <span className="text-sm">{useCase.web3_use_cases_id.translations.name}</span>
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
              {/* Second Row with Date */}
              {/* <div className="flex flex-row space-x-4 text-xs text-base-content/80">
              <div className="flex items-center">
                <CalendarDaysIcon
                  className="mr-1 h-4 w-5 text-base-content/60"
                  aria-hidden="true"
                />
                {info.cell.row.original.date}
              </div>
            </div> */}
              {/* Third Row with Event */}
              {/* {info.cell.row.original.events?.name && (
              <div className="flex flex-col text-xs text-base-content/80">
                <div className="flex items-center">
                  <MapPinIcon className="mr-1 h-4 w-5 text-base-content/60" aria-hidden="true" />
                  {info.cell.row.original.events?.name}
                </div>
              </div>
            )} */}
              {/* Fourth row with description */}
              <div className="text-sm text-base-content">
                {info.cell.row.original.translations.name}
              </div>

              {/* First Row with label */}
              <div className="flex flex-row flex-wrap gap-1">
                {info.cell.row.original.grant_blockchains.map((blockchain, index) => (
                  <div key={`${index}-${info.row.original.id}`} className="badge-primary badge">
                    <span className="text-sm">{blockchain.web3_blockchains_id.name}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-row flex-wrap gap-1">
                {info.cell.row.original.grant_use_cases.map((useCase, index) => (
                  <div key={`${index}-${info.row.original.id}`} className="badge-secondary badge">
                    <span className="text-sm">{useCase.web3_use_cases_id.translations.name}</span>
                  </div>
                ))}
              </div>

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
          <div className="pr-2">
            <Link href={`/web3-grants/${info.cell.row.original.slug}`}>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 text-primary" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </TableCell>
    ),
  }),
]
