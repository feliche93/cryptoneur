'use client'

import dynamic from 'next/dynamic'

const PostHogPageView = dynamic(() => import('@/components/posthog-page-view'), {
  ssr: false,
})

export function PostHogPageViewClient() {
  return <PostHogPageView />
}
