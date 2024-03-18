import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function IndexPage() {
  return (
    <div className="container relative">
      <PageHeader className="pb-8 flex flex-col items-center">
        {/* <Link
    href="/docs/changelog"
    className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
  >
    🎉 <Separator className="mx-2 h-4" orientation="vertical" />{' '}
    <span className="sm:hidden">Test test.</span>
    <span className="hidden sm:inline">Introducing Style, a new CLI and more.</span>
    <ArrowRightIcon className="ml-1 h-4 w-4" />
  </Link> */}

        {/* <Image
          className="border border-primary-foreground rounded-full"
          src={'/logos/felix-vemmer.png'}
          priority={true}
          width={200}
          height={200}
          alt="Felix Vemmer"
        /> */}

        <PageHeaderHeading className="text-center">
          The Best Resources for Web3 Entrepreneurs
        </PageHeaderHeading>
        <PageHeaderDescription className="text-center">
          Discover the ultimate collection of resources tailored for the ambitious Web3
          entrepreneur. Dive into a world where innovation meets opportunity.
        </PageHeaderDescription>
        <div className="flex w-full sm:w-fit flex-col sm:flex-row justify-center items-center gap-4 pb-8 pt-4 md:pb-10">
          <Link
            href="/gas-fees-calculator"
            className={cn(
              buttonVariants({
                variant: 'default',
                size: 'lg',
                className: 'w-full',
              }),
            )}
          >
            Gas Fees Caculator
          </Link>
          <Link
            href={'/web3-grants'}
            className={cn(buttonVariants({ variant: 'outline', size: 'lg', className: 'w-full' }))}
          >
            Web3 Grants
          </Link>
        </div>
      </PageHeader>
      {/* KPIs */}
      {/* <Suspense fallback={<KpisFallback />}>
        <Kpis />
      </Suspense> */}
    </div>
  )
}
