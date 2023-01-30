'use client'

import { FC } from 'react'
import { Toaster } from 'react-hot-toast'

export interface ToasterWrapperProps {
  position?:
    | 'top-center'
    | 'top-right'
    | 'top-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'bottom-left'
  reverseOrder?: boolean
}
export const ToasterWrapper: FC<ToasterWrapperProps> = ({
  position = 'top-right',
  reverseOrder = false,
}) => {
  return <Toaster position={position} reverseOrder={reverseOrder} />
}
