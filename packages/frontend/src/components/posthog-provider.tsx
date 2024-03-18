'use client'

import { absoluteUrl } from '@/lib/utils'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
const posthogHost = absoluteUrl('/ingest')

if (!posthogKey) throw new Error('NEXT_PUBLIC_POSTHOG_KEY is not set')
if (!posthogHost) throw new Error('NEXT_PUBLIC_POSTHOG_HOST is not set')

if (typeof window !== 'undefined') {
  // console.log('posthogHost', posthogHost)
  posthog.init(posthogKey, {
    api_host: posthogHost,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    // Enable debug mode in development
    // loaded: (posthog) => {
    //   if (process.env.NODE_ENV === 'development') posthog.debug()
    // },
  })
}

export function PHProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}