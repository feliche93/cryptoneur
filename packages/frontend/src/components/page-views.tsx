import { getTotalPageViewsByPath } from '@/lib/posthog-api'
import { cn } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import { FC } from 'react'

export interface PageViewsProps {
  slug: string
  className?: string
}
export const PageViews: FC<PageViewsProps> = async ({ slug, className }) => {
  const pageviews = await getTotalPageViewsByPath({ path: slug })

  if (!pageviews) return null

  return (
    <div className={cn('text-sm text-muted-foreground', className)}>
      <EyeIcon className="h-4 w-4 inline-block" /> {pageviews.toLocaleString()}
    </div>
  )
}
