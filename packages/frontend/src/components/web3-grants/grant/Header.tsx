import { strapi } from '@shared/strapi'
import dayjs from 'dayjs'
import Image from 'next/image'
import { FC } from 'react'

export interface HeaderProps {
  slug: string
}

// @ts-expect-error Server Component
export const Header: FC<HeaderProps> = async ({ slug }) => {
  console.log({ slug })

  const { data: grants } = await strapi.find<any>('grants', {
    populate: 'logo',
    filters: {
      slug: {
        $eq: slug,
      },
    },
  })

  if (!grants?.length) {
    return null
  }

  const grant = grants[0]

  console.log({ ...grant })

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
      <div className="flex items-center space-x-5">
        <div className="flex-shrink-0">
          <div className="relative">
            <Image
              className="h-16 w-16 rounded-full"
              src={grant?.attributes?.logo?.data?.attributes?.url}
              alt={grant?.attributes?.logo?.data?.attributes?.alternativeText}
              width={grant?.attributes?.logo?.data?.attributes?.width}
              height={grant?.attributes?.logo?.data?.attributes?.height}
            />
            <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{grant?.attributes?.name}</h1>
          <p className="text-sm font-medium text-base-content/80">
            Last Updated{' '}
            {/* <a href="#" className="text-gray-900">
              Front End Developer
            </a>{' '} */}
            {/* TODO: add relative time */}
            on{' '}
            <time dateTime={grant?.attributes?.updatedAt}>
              {dayjs(grant?.attributes?.updatedAt).format('MMMM DD, YYYY')}
            </time>
          </p>
        </div>
      </div>
      <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
        {!!grant?.attributes?.linkInfo && (
          <a
            target={'_blank'}
            rel="noopener nofollow"
            href={grant?.attributes?.linkInfo}
            className="btn-outline btn-primary btn"
          >
            Grant Info Page
          </a>
        )}
        {!!grant?.attributes?.linkApplication && (
          <a
            target={'_blank'}
            rel="noopener nofollow"
            href={grant?.attributes?.linkApplication}
            className="btn-primary btn"
          >
            Apply
          </a>
        )}
      </div>
    </div>
  )
}
