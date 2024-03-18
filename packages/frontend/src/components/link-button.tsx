import { cn } from '@/lib/utils'
import Link from 'next/link'
import { FC } from 'react'
import { ButtonProps, buttonVariants } from './ui/button'

export interface LinkButtonProps extends ButtonProps {
  href: string
  label: string
}
export const LinkButton: FC<LinkButtonProps> = ({ label, href, variant, size, className }) => {
  return (
    <Link className={cn(buttonVariants({ variant, size, className }))} href={href}>
      {label}
    </Link>
  )
}
