import { FC } from 'react'

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { ChartBarIcon } from '@heroicons/react/24/outline'
import { UpdateIcon } from '@radix-ui/react-icons'
import { ArchiveIcon, BellIcon, FilterIcon, UsersIcon } from 'lucide-react'

export const Features: FC = () => {
  const features = [
    {
      name: 'Customized Filters',
      description:
        'Easily find grants that align with your idea by using our advanced filtering options, including categories, blockchain ecosystem, funding amount, and use cases.',
      icon: FilterIcon,
      launched: true,
    },
    {
      name: 'Up-to-Date and Comprehensive',
      description:
        'By collaborating with both grant programs and individual contributors, we are able to maintain an up-to-date and comprehensive dataset.',
      icon: UpdateIcon,
      launched: true,
    },
    {
      name: 'Access to Previous Applications',
      description:
        'We provide access to a vast database of previous grant applications, both successful and unsuccessful, allowing you to learn from the experiences of others and improve your own grant application.',
      icon: ArchiveIcon,
      launched: true,
    },
    {
      name: 'Data-Driven Insights',
      description:
        'Our data-driven approach provides valuable insights on the grant application process, successful grants, and average funding amounts. By analyzing data on past grants, you can make informed decisions and increase your chances of success.',
      icon: ChartBarIcon,
      launched: true,
    },
    {
      name: 'Customizable Grant Alerts',
      description:
        'Stay informed of new grant opportunities that align with your specific criteria by setting up customizable alerts on our platform.',
      icon: BellIcon,
      launched: true,
    },
    {
      name: 'Mentorship Program',
      description:
        'Connect with experienced grant writers or other experts through our mentorship program to receive guidance and feedback on your applications.',
      icon: UsersIcon,
      launched: true,
    },
  ]

  return (
    <PageHeader id="features">
      <PageHeaderHeading level="h2">Easily explore new and past Grants</PageHeaderHeading>
      <PageHeaderDescription className="text-base sm:text-lg">
        Explore our comprehensive database of web3 grants, from the latest to the past.
      </PageHeaderDescription>
      <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
        <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground sm:shrink-0">
                <feature.icon className="h-8 w-8" aria-hidden="true" />
              </div>
              <div className="sm:min-w-0 sm:flex-1">
                <div className="flex flex-row">
                  <p className="text-lg font-semibold leading-8">{feature.name}</p>
                  {!feature.launched && (
                    <span className="badge badge-accent ml-2">Coming soon</span>
                  )}
                </div>
                <p className="mt-2 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageHeader>
  )
}
