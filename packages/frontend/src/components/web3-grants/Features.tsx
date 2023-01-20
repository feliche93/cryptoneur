import { FC } from 'react'
import {
  AcademicCapIcon,
  BellAlertIcon,
  BoltIcon,
  ChartBarIcon,
  CheckBadgeIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon,
  FunnelIcon,
  GlobeAltIcon,
  ScaleIcon,
} from '@heroicons/react/24/outline'

export interface FeaturesProps {}
export const Features: FC<FeaturesProps> = () => {
  const features = [
    {
      name: 'Customized Filters',
      description:
        'Easily find grants that align with your idea by using our advanced filtering options, including categories, blockchain ecosystem, funding amount, and use cases.',
      icon: FunnelIcon,
    },
    {
      name: 'Up-to-Date and Comprehensive',
      description:
        'By collaborating with both grant programs and individual contributors, we are able to maintain an up-to-date and comprehensive dataset.',
      icon: CheckBadgeIcon,
    },
    {
      name: 'Access to Previous Applications',
      description:
        'We provide access to a vast database of previous grant applications, both successful and unsuccessful, allowing you to learn from the experiences of others and improve your own grant application.',
      icon: DocumentDuplicateIcon,
    },
    {
      name: 'Data-Driven Insights',
      description:
        'Our data-driven approach provides valuable insights on the grant application process, successful grants, and average funding amounts. By analyzing data on past grants, you can make informed decisions and increase your chances of success.',
      icon: ChartBarIcon,
    },
    {
      name: 'Customizable Grant Alerts',
      description:
        'Stay informed of new grant opportunities that align with your specific criteria by setting up customizable alerts on our platform.',
      icon: BellAlertIcon,
    },
    {
      name: 'Mentorship Program',
      description:
        'Connect with experienced grant writers or other experts through our mentorship program to receive guidance and feedback on your applications.',
      icon: AcademicCapIcon,
    },
  ]
  return (
    <div className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8 lg:py-40">
      <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16">
        <div className="lg:col-span-1">
          <h2 className="text-4xl font-bold tracking-tight sm:text-4xl">
            Making grants great again.
          </h2>
        </div>
        <dl className="mt-20 grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-x-12 lg:col-span-2 lg:mt-0">
          {features.map((feature) => (
            <div key={feature.name}>
              <dt>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-content">
                  <feature.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <p className="mt-6 text-lg font-semibold leading-8">{feature.name}</p>
              </dt>
              <dd className="mt-2 text-base text-base-content/80">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
