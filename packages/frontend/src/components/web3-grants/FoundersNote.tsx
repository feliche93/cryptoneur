import { GraidentAvatar } from '@components/shared/GradientAvatar'
import Image from 'next/image'
import { FC } from 'react'

export const FoundersNote: FC = () => {
  return (
    <div className="mx-auto my-12 max-w-2xl overflow-hidden rounded-none bg-base-200 shadow sm:rounded-lg">
      <div className="space-y-8 bg-base-100 px-4 py-5 text-2xl sm:p-6">
        <h3 className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-semibold text-transparent">
          As a web3 entrepreneur, finding the right funding opportunity for your project can be a
          daunting task.
        </h3>
        <div className="text-lg text-base-content/80">
          <p>
            With so many grants available, it can be difficult to navigate and find the ones that
            align with your specific project and use case. Additionally, a lack of data-driven
            insights on past and successful grant applications can make the application process even
            more challenging.
          </p>
          <br />
          <p>
            We understand these challenges and have created a solution. Our web3 grant platform is a
            comprehensive and constantly updated database of web3 grants, equipped with advanced
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
          <GraidentAvatar alt="Samuel Ju" image="/profilePic.jpg" size={80} />
          <div className="ml-4 inline-block">
            <div className="text-xl font-bold text-base-content">Felix Vemmer</div>
            <div className="text-base font-thin text-base-content">Co-Founder & CEO</div>
          </div>
        </div>
      </div>
    </div>
  )
}
