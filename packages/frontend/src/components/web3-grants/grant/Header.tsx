import { getGrantbySlug, strapi } from '@shared/strapi'
import { createServerClient } from '@utils/supabase-server'
import dayjs from 'dayjs'
import Image from 'next/image'
import { FC } from 'react'

export interface HeaderProps {
  slug: string
}

// @ts-expect-error Server Component
export const Header: FC<HeaderProps> = async ({ slug }) => {
  console.log({ slug })

  const supabase = createServerClient()
  const { data: grant, error } = await supabase.from('grants').select('*').eq('slug', slug).single()

  // console.log({ ...grant, ...error })

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
      <div className="flex items-center space-x-5">
        <div className="flex-shrink-0">
          {grant?.logo && grant?.name && (
            <Image
              className=" h-16 w-16 rounded-lg object-contain"
              src={grant?.logo}
              alt={grant?.name}
              width={200}
              height={200}
            />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{grant?.name}</h1>
          <p className="text-sm font-medium text-base-content/80">
            Last Updated{' '}
            {/* <a href="#" className="text-gray-900">
              Front End Developer
            </a>{' '} */}
            {/* TODO: add relative time */}
            on{' '}
            <time dateTime={grant?.updated_at}>
              {dayjs(grant?.updated_at).format('MMMM DD, YYYY')}
            </time>
          </p>
        </div>
      </div>
      <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
        {!!grant?.url_info && (
          <a
            target={'_blank'}
            rel="noopener nofollow"
            href={grant?.url_info}
            className="btn-outline btn-primary btn"
          >
            Grant Info Page
          </a>
        )}
        {!!grant?.url_application && (
          <a
            target={'_blank'}
            rel="noopener nofollow"
            href={grant?.url_application}
            className="btn-primary btn"
          >
            Apply
          </a>
        )}
      </div>
    </div>
  )
}
