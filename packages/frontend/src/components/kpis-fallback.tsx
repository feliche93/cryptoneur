import { Skeleton } from './ui/skeleton'
import { Grid } from '@tremor/react'

export const KpisFallback = () => {
  return (
    <Grid numItemsSm={2} numItemsLg={3} className="gap-6 max-w-5xl mx-auto container">
      <Skeleton className='h-[104px]' />
      <Skeleton className="h-[104px]" />
      <Skeleton className="h-[104px]" />
    </Grid>
  )
}