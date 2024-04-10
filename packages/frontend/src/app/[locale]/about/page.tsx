import { Featured } from '@/components/featured'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <>
      <div className="container relative">
        <PageHeader className="pb-8 flex flex-col items-center">
          <Image
            className="border border-primary-foreground rounded-full"
            src={'/profilePic.jpg'}
            priority={true}
            width={200}
            height={200}
            alt="Felix Vemmer"
          />

          <PageHeaderHeading className="text-center">
            {'👋 Welcome to cryptoneur.xyz'}
          </PageHeaderHeading>
          <PageHeaderDescription className="text-center">
            {
              'I am building the largest crypto-currency resource base for entrpreneurs in web3. Feel free to check out my other projects in the meantime.'
            }
          </PageHeaderDescription>
        </PageHeader>
      </div>
      <Featured />
    </>
  )
}
