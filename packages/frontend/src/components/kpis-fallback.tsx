import { Grid } from '@tremor/react'
import { Skeleton } from './ui/skeleton'

export const KpisFallback = () => {
  return (
    <Grid numItemsSm={2} numItemsLg={3} className="gap-6 max-w-5xl mx-auto container">
      <Skeleton className="h-[104px]" />
      <Skeleton className="h-[104px]" />
      <Skeleton className="h-[104px]" />
    </Grid>
  )
}
