'use client'

import { FC } from 'react'
import { Toaster, ToasterProps, ToastPosition } from 'react-hot-toast'

export interface ToasterWrapperProps {
  position?: ToastPosition
  reverseOrder?: ToasterProps['reverseOrder']
}
export const ToasterWrapper: FC<ToasterWrapperProps> = ({
  position = 'top-right',
  reverseOrder = false,
}) => {
  return <Toaster position="top-right" reverseOrder={false} />
}
