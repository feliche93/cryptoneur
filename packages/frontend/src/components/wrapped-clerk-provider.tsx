'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { FC, PropsWithChildren } from 'react'

export interface WrappedClerkProviderProps extends PropsWithChildren {}
export const WrappedClerkProvider: FC<WrappedClerkProviderProps> = ({ children }) => {
  const { resolvedTheme } = useTheme()

  return (
    <ClerkProvider appearance={resolvedTheme === 'dark' ? { baseTheme: dark } : {}}>
      {children}
    </ClerkProvider>
  )
}
