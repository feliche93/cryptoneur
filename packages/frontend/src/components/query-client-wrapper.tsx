'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, PropsWithChildren } from 'react'

export interface QueryClientWrapperProps extends PropsWithChildren {}
export const QueryClientWrapper: FC<QueryClientWrapperProps> = ({ children }) => {
  const queryClient = new QueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
