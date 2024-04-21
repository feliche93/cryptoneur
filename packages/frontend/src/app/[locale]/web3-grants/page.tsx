import { Features } from '@/components/features'
import { FoundersNote } from '@/components/founders-note'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
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
          <Link
            href="/web3-grants/grants"
            className={cn(
              buttonVariants({
                size: 'lg',
              }),
            )}
          >
            Explore Grants
          </Link>
        </PageActions>
      </PageHeader>
      <Features />
      <FoundersNote />
      {/* FAQ */}
      <PageHeader>
        <PageHeaderHeading className="text-xl md:text-4xl" level="h2">
          FAQ
        </PageHeaderHeading>
        <Accordion
          className="w-full max-w-3xl mx-auto"
          type="single"
          defaultValue="item-1"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>What is your web3 grant platform about?</AccordionTrigger>
            <AccordionContent>
              Our web3 grant platform is a database of web3 grants. It's a place where you can find
              information about web3 grants. Start
              <Link className="underline p-1" href={'/web3-grants/grants'}>
                exploring
              </Link>
              to see the grants.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </PageHeader>
    </div>
  )
}
