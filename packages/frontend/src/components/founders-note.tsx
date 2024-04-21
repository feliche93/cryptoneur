import { FC } from 'react'

import { Card } from '@/components/ui/card'
import Image from 'next/image'

export const FoundersNote: FC = () => {
  return (
    <Card className="mx-auto my-12 max-w-2xl overflow-hidden sm:rounded-lg">
      <div className="space-y-8 px-4 py-5 text-2xl sm:p-6">
        <h2 className="font-bold">
          As a web3 entrepreneur, finding the right funding opportunity for your project can be a
          daunting task.
        </h2>
        <div className="text-lg text-muted-foreground">
          <p>
            With so many grants available, it can be difficult to navigate and find the ones that
            align with your specific project and use case. Additionally, a lack of data-driven
            insights on past and successful grant applications can make the application process even
            more challenging.
          </p>
          <br />
          <p>
            We understand these challenges and have created a solution. This web3 grant platform is
            a comprehensive and constantly updated database of web3 grants, equipped with advanced
            filtering options and valuable data-driven insights to make the search and application
            process easier for you.
          </p>
          <br />
          <p>
            But our platform isn't just about providing resources - it's also about building a
            community. Anyone can contribute and add information to our database, making it even
            more complete and beneficial for all users.
          </p>
          <br />
          <p>
            As a web3 entrepreneur, I understand the importance of funding and resources for the
            success of your project. That's why I'm committed to making Cryptoneur's web3 grant
            platform the go-to destination for anyone looking for funding opportunities in the web3
            space.
          </p>
        </div>
      </div>
      <div className="bg-base-300 px-4 py-4 sm:px-6">
        <div className="flex items-center justify-start">
          <Image
            alt="Felix Vemmer"
            src="/profilePic.jpg"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="ml-4 inline-block">
            <div className="text-xl font-bold">Felix Vemmer</div>
            <div className="text-base text-muted-foreground">Founder & CEO</div>
          </div>
        </div>
      </div>
    </Card>
  )
}
