'use client'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { TGrant } from '@/data/grants'
import { absoluteUrl, formatCurrency } from '@/lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import { ExternalLink, PencilLineIcon } from 'lucide-react'
import { DataTableRowActions, LinkRowAction } from '../data-table/data-table-row-actions'
import { Badge } from '../ui/badge'
import { Checkbox } from '../ui/checkbox'

export function getColumns(): ColumnDef<TGrant>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value)
          }}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value)
          }}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'grantName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      cell: ({ row }) => <div>{row.original.grantName}</div>,
    },
    {
      accessorKey: 'grantOrganizationName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Organization" />,
      cell: ({ row }) => <div>{row.original.grantOrganizationName}</div>,
    },
    {
      accessorKey: 'grantActive',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Active" />,
      cell: ({ row }) => (
        <Badge variant={row.original.grantActive ? 'outline' : 'destructive'}>
          {row.original.grantActive ? 'Yes' : 'No'}
        </Badge>
      ),
    },
    {
      accessorKey: 'grantBlockchainNames',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Blockchain" />,
      cell: ({ row }) => <div>{row.original.grantBlockchainNames.join(', ')}</div>,
      enableSorting: false,
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: 'grantUseCaseNames',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Use Case" />,
      cell: ({ row }) => <div>{row.original.grantUseCaseNames.join(', ')}</div>,
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: 'grantCategoryNames',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
      cell: ({ row }) => <div>{row.original.grantCategoryNames.join(', ')}</div>,
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: 'grantFundingAmountMin',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Funding Amount Min" />,
      cell: ({ row }) => (
        <div>
          {formatCurrency(row.original.grantFundingAmountMin, row.original.grantFiatCurrencySymbol)}
        </div>
      ),
    },
    {
      accessorKey: 'grantFundingAmountMax',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Funding Amount Max" />,
      cell: ({ row }) => (
        <div>
          {formatCurrency(row.original.grantFundingAmountMax, row.original.grantFiatCurrencySymbol)}
        </div>
      ),
    },
    {
      id: 'actions',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
      cell: ({ row, table }) => {
        const viewHref = absoluteUrl(`/web3-grants/grants/${row.original.grantSlug}`)

        return (
          <DataTableRowActions>
            {/* <LinkRowAction href={viewHref} tooltip="View Grant Details">
              <ArrowRightCircle className="size-4 text-primary" />
            </LinkRowAction> */}
            <LinkRowAction
              target="_blank"
              href={row.original.grantUrlApplication}
              tooltip="Apply for Grant"
            >
              <PencilLineIcon className="size-4 text-success" />
            </LinkRowAction>
            <LinkRowAction
              target="_blank"
              href={row.original.grantUrlInfo}
              tooltip="View Grant Info"
            >
              <ExternalLink className="size-4 text-error" />
            </LinkRowAction>
          </DataTableRowActions>
        )
      },
    },
  ]
}
