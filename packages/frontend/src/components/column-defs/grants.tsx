'use client'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { TGrant } from '@/data/grants'
import { absoluteUrl, formatCurrency } from '@/lib/utils'
import type { TDataTableSearchableColumn } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'
import { ExternalLink, PencilLineIcon } from 'lucide-react'
import { DataTableRowActions, LinkRowAction } from '../data-table/data-table-row-actions'
import { Badge } from '../ui/badge'

export function fetchGrantsTableColumnDef(): ColumnDef<TGrant, unknown>[] {
  return [
    // {
    //   id: 'select',
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={table.getIsAllPageRowsSelected()}
    //       onCheckedChange={(value) => {
    //         table.toggleAllPageRowsSelected(!!value)
    //       }}
    //       aria-label="Select all"
    //       className="translate-y-[2px]"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => {
    //         row.toggleSelected(!!value)
    //       }}
    //       aria-label="Select row"
    //       className="translate-y-[2px]"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    // {
    //   accessorKey: 'grants.logoUrl',
    //   header: ({ column }) => <></>,
    //   cell: ({ row }) => (
    //     <Avatar className="w-8 h-8">
    //       <AvatarImage src={row.original.gralogoUrl || ''} alt={row.original.grants.name} />
    //       <AvatarFallback className="uppercase">
    //         {row.original.grants.name.slice(0, 2)}
    //       </AvatarFallback>
    //     </Avatar>
    //   ),
    // },
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
    // {
    //   accessorKey: 'campaignCreatedAt',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    //   cell: ({ row }) => {
    //     return (
    //       <span>
    //         {row.original.campaignCreatedAt
    //           ? formatDistanceToNow(new Date(row.original.campaignCreatedAt), {
    //               addSuffix: true,
    //             })
    //           : null}
    //       </span>
    //     )
    //   },
    // },
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

export const searchableColumns: TDataTableSearchableColumn<TGrant>[] = [
  {
    id: 'grantName',
    placeholder: 'Filter Grant Name...',
  },
]
