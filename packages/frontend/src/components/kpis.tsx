import { getTotalLemonSqueezyRevenue } from '@/lib/lemonsqueezy'
import { getFreelancingRevenue } from '@/lib/paierkram-api'
import { getPostHogInsightById } from '@/lib/posthog-api'
import { Grid, Metric, Text } from '@tremor/react'
import { FC } from 'react'
import { Card } from './ui/card'

export const Kpis: FC = async () => {
  const freelancingRevenuePromise = getFreelancingRevenue()

  const pageViewsInsightPromise = getPostHogInsightById({
    id: 120881,
  })

  const lemonSqueezyRevenuePromise = getTotalLemonSqueezyRevenue({
    storeId: '24094',
  })

  const [freelancingRevenue, pageViewsInsight, lemonSqueezyRevenue] = await Promise.all([
    freelancingRevenuePromise,
    pageViewsInsightPromise,
    lemonSqueezyRevenuePromise,
  ])

  const categories = [
    {
      title: pageViewsInsight.name,
      //   @ts-ignore
      metric: pageViewsInsight.result[0].aggregated_value.toLocaleString() as string,
    },
    {
      title: 'Total Freelancing Revenue',
      metric: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }).format(freelancingRevenue),
    },
    {
      title: 'Total SaaS Revenue',
      metric: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }).format(lemonSqueezyRevenue / 100),
    },
  ]

  return (
    <>
      {/* <pre>{JSON.stringify(pageViewsInsight, null, 2)}</pre> */}
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6 max-w-5xl mx-auto container">
        {categories.map((item) => (
          <Card key={item.title} className="p-6">
            <Text>{item.title}</Text>
            <Metric>{item.metric}</Metric>
          </Card>
        ))}
      </Grid>
    </>
  )
}
