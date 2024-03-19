import { cn } from '@/lib/utils'
import { SortDirection } from '@tanstack/react-table'
import { VariantProps, cva } from 'class-variance-authority'
import clsx from 'clsx'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { FC, PropsWithChildren } from 'react'

const tableHeaderVariants = cva('table-header', {
  variants: {
    type: {
      default:
        'hidden cursor-pointer px-4 py-3.5 text-left text-sm font-semibold text-base-content hover:underline lg:table-cell',
      mobile:
        'cursor-pointer px-4 py-3.5 text-left text-sm font-semibold text-base-content hover:underline lg:hidden',
    },
  },
  defaultVariants: {
    type: 'default',
  },
})

export interface TableHeaderProps
  extends PropsWithChildren,
    VariantProps<typeof tableHeaderVariants> {
  isSorted?: false | SortDirection
  getToggleSortingHandler?: ((event: unknown) => void) | undefined
  className?: string
}

export const TableHeader: FC<TableHeaderProps> = ({
  children,
  className,
  isSorted,
  getToggleSortingHandler,
  type,
}) => {
  const isMobile = type === 'mobile'
  const onClickHandler = isMobile || !getToggleSortingHandler ? undefined : getToggleSortingHandler

  return (
    <th
      onClick={onClickHandler}
      scope="col"
      className={clsx(tableHeaderVariants({ type, className }), {
        'cursor-default': isMobile || !getToggleSortingHandler,
      })}
    >
      <div
        className={clsx(
          'flex flex-row items-center',
          className?.includes('text-right') && 'justify-end',
        )}
      >
        {children}
        {isSorted !== undefined && (
          <span className={cn('ml-2')}>
            {isSorted ? (
              isSorted == 'asc' ? (
                <ArrowDown className="h-5 w-5 text-primary" />
              ) : (
                <ArrowUp className="h-5 w-5 text-primary" />
              )
            ) : (
              ''
            )}
          </span>
        )}
      </div>
    </th>
  )
}
