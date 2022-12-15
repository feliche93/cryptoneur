import { FC } from 'react'
import {
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
      name: 'Filters',
      description:
        'Filter by category, blockchain eco system, funding amount or use cases to find grants that match your idea.',
      icon: FunnelIcon,
    },
    {
      name: 'Up to date & Complete',
      description:
        'We work with grant programs as well as individual contributors together to have the most up to date and complete dataset.',
      icon: CheckBadgeIcon,
    },
    {
      name: 'Past Applications',
      description:
        'We collect both failed and succesful previous applications to grants. This way you can learn from others.',
      icon: DocumentDuplicateIcon,
    },
    {
      name: 'Data Driven',
      description:
        'We collect data on the applciation process, failed and succesful grants as well as average funding size.',
      icon: ChartBarIcon,
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
