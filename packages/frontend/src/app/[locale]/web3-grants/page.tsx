import { Features } from '@/components/features'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { buttonVariants } from '@/components/ui/button'
import { getGrantsCount } from '@/data/grants'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default async function Web3GrantsPage() {
  const grantsCount = await getGrantsCount()

  return (
    <div className="container py-12 relative">
      <PageHeader>
        {/* <Announcement /> */}
        <PageHeaderHeading>Crunchbase for Web3 Grants</PageHeaderHeading>
        <PageHeaderDescription>
          {`We have a complete and up-to-date database of ${grantsCount} web3 grants. Filter and search for grants by category, amount, and more.`}
        </PageHeaderDescription>
        <PageActions>
          <Link href="/web3-grants/grants" className={cn(buttonVariants())}>
            Get Started
          </Link>
        </PageActions>
      </PageHeader>
      <Features />
    </div>
  )
}
