import { DirectusImage } from '@components/shared/directus-image'
import directus, { isObject } from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import { getGrantbySlug, strapi } from '@shared/strapi'
import { createServerClient } from '@utils/supabase-server'
import dayjs from 'dayjs'
import Image from 'next/image'
import { FC } from 'react'
import { z } from 'zod'

export const schema = z.object({
  name: z.string(),
  web3_grants_id: z.object({
    logo: z.string(),
    url_application: z.string().optional(),
    url_info: z.string().optional(),
    date_updated: z.string(),
  }),
})

// @ts-expect-error Server Component
export const Header: FC<BlockType> = async ({ id, lang }) => {
  const data = await directus.items('web3_grants_translations').readOne(id, {
    fields: [
      'name',
      'web3_grants_id.logo',
      'web3_grants_id.url_application',
      'web3_grants_id.url_info',
      'web3_grants_id.date_updated',
    ],
  })

  const parsedData = schema.parse(data)

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
      <div className="flex items-center space-x-5">
        <div className="flex-shrink-0">
          <DirectusImage
            className="h-16 w-16 rounded-lg object-contain"
            id={parsedData.web3_grants_id.logo}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{parsedData.name}</h1>
          <p className="text-sm font-medium text-base-content/80">
            Last Updated {/* TODO: add relative time */}
            on{' '}
            <time dateTime={parsedData.web3_grants_id.date_updated}>
              {dayjs(parsedData.web3_grants_id.date_updated).format('MMMM DD, YYYY')}
            </time>
          </p>
        </div>
      </div>
      <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
        {!!parsedData.web3_grants_id.url_info && (
          <a
            target={'_blank'}
            rel="noopener nofollow"
            href={parsedData.web3_grants_id.url_info}
            className="btn-outline btn-primary btn"
          >
            Grant Info Page
          </a>
        )}
        {!!parsedData.web3_grants_id.url_application && (
          <a
            target={'_blank'}
            rel="noopener nofollow"
            href={parsedData.web3_grants_id.url_application}
            className="btn-primary btn"
          >
            Apply
          </a>
        )}
      </div>
    </div>
  )
}
