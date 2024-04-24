'use client'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Link from 'next/link'
import { FC, HTMLAttributeAnchorTarget, PropsWithChildren } from 'react'

export interface DataTableRowActionsProps extends PropsWithChildren {}

export function DataTableRowActions({ children }: DataTableRowActionsProps) {
  return <div className="flex flex-row gap-1 -px-2 items-center justify-start">{children}</div>
}

export interface LinkRowActionProps {
  href: string
  children?: React.ReactNode
  tooltip: string
  target?: HTMLAttributeAnchorTarget
}
export const LinkRowAction: FC<LinkRowActionProps> = ({ href, tooltip, children, target }) => {
  return (
    <Link target={target} href={href}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={'ghost'}>{children}</Button>
          </TooltipTrigger>
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  )
}

export interface ButtonRowActionProps extends PropsWithChildren {
  tooltip: string
  onClick: () => void
}
export const ButtonRowAction: FC<ButtonRowActionProps> = ({ children, onClick, tooltip }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={onClick} variant="ghost">
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
