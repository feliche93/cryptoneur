import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { FC, PropsWithChildren } from 'react'

const tableCellVariants = cva('table-cell', {
  variants: {
    type: {
      default:
        'hidden whitespace-nowrap px-4 py-4 text-left text-sm text-base-content/80 lg:table-cell',
      mobile: 'lg:hidden',
    },
  },
  defaultVariants: {
    type: 'default',
  },
})

export interface TableCellProps
  extends PropsWithChildren<{}>,
    VariantProps<typeof tableCellVariants> {
  className?: string
}

export const TableCell: FC<TableCellProps> = ({ children, className, type }) => {
  return <td className={cn(tableCellVariants({ type, className }))}>{children}</td>
}
