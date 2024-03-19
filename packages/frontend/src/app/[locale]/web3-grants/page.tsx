import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'

export default function Web3GrantsPage() {
  return (
    <div className="container py-12 relative">
      <PageHeader className="flex flex-col items-center">
        <h2 className="text-lg text-center sm:text-left py-2 font-bold">We'll Back Soon</h2>
        <PageHeaderHeading className="text-center sm:text-left">
          Web3 Grants Coming Soon ™
        </PageHeaderHeading>
        <PageHeaderDescription className="text-center sm:text-left">
          We're currently working on the best resources for Web3 entrepreneurs. Stay tuned!
        </PageHeaderDescription>
      </PageHeader>
    </div>
  )
}
