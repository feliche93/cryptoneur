import clsx from 'clsx'

import { FC } from 'react'

export interface ContainerProps extends PropsWithChildren {
  className?: string
}

import { PropsWithChildren } from 'react'

export const Container: FC<ContainerProps> = ({ children, className, ...props }) => {
  return (
    <div className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props}>
      {children}
    </div>
  )
}
