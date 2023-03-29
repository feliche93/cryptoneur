import * as React from 'react'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva('btn', {
  variants: {
    variant: {
      default: '',
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      accent: 'btn-accent',
      ghost: 'btn-ghost',
      link: 'btn-link',
      info: 'btn-info',
      success: 'btn-success',
      warning: 'btn-warning',
      error: 'btn-error',
      primaryOutline: 'btn-outline btn-primary',
      secondaryOutline: 'btn-outline btn-secondary',
      accentOutline: 'btn-outline btn-accent',
      infoOutline: 'btn-outline btn-info',
      successOutline: 'btn-outline btn-success',
      warningOutline: 'btn-outline btn-warning',
      errorOutline: 'btn-outline btn-error',
      glass: 'btn-glass',
    },
    size: {
      default: '',
      xs: 'btn-xs',
      sm: 'btn-sm',
      lg: 'btn-lg',
      responsive: 'btn sm:btn-lg md:btn-lg',
    },
    shape: {
      default: '',
      circle: 'btn-circle',
      square: 'btn-square',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    shape: 'default',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
