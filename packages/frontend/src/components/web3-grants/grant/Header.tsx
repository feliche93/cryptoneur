import { DirectusImage } from '@components/shared/directus-image'
import directus, { isObject } from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import { getGrantbySlug, strapi } from '@shared/strapi'
import { createServerClient } from '@utils/supabase-server'
import dayjs from 'dayjs'
import Image from 'next/image'
import { FC } from 'react'
import { z } from 'zod'

export const grantDataSchema = z.object({
  name: z.string(),
  web3_grants_id: z.object({
    logo: z.string(),
    url_application: z.string().optional(),
    url_info: z.string().optional(),
    date_updated: z.string(),
  }),
})

const grantTranslationsSchema = z.array(
  z.object({
    last_updated_label: z.string(),
    apply_label: z.string(),
    grant_info_page_label: z.string(),
  }),
)

// @ts-expect-error Server Component
export const Header: FC<BlockType> = async ({ id, lang }) => {
  const grantData = await directus.items('web3_grants_translations').readOne(id, {
    fields: [
      'name',
      'web3_grants_id.logo',
      'web3_grants_id.url_application',
      'web3_grants_id.url_info',
      'web3_grants_id.date_updated',
    ],
  })

  const parsedGrantData = grantDataSchema.parse(grantData)

  const grantTranslations = await directus.singleton('web3_grants_detail_page_translations').read({
    fields: ['last_updated_label', 'apply_label', 'grant_info_page_label'],
  })

  const parsedGrantTranslations = grantTranslationsSchema.parse(grantTranslations)

  const [grantTranslation] = parsedGrantTranslations

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
      <div className="flex items-center space-x-5">
        <div className="flex-shrink-0">
          <DirectusImage
            className="h-16 w-16 rounded-lg object-contain"
            id={parsedGrantData.web3_grants_id.logo}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{parsedGrantData.name}</h1>
          <p className="text-sm font-medium text-base-content/80">
            {grantTranslation.last_updated_label}
            <time dateTime={parsedGrantData.web3_grants_id.date_updated}>
              {dayjs(parsedGrantData.web3_grants_id.date_updated).format('MMMM DD, YYYY')}
            </time>
          </p>
        </div>
      </div>
      <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
        {!!parsedGrantData.web3_grants_id.url_info && (
          <a
            target={'_blank'}
            rel="noopener nofollow"
            href={parsedGrantData.web3_grants_id.url_info}
            className="btn-outline btn-primary btn"
          >
            {grantTranslation.grant_info_page_label}
          </a>
        )}
        {!!parsedGrantData.web3_grants_id.url_application && (
          <a
            target={'_blank'}
            rel="noopener nofollow"
            href={parsedGrantData.web3_grants_id.url_application}
            className="btn-primary btn"
          >
            {grantTranslation.apply_label}
          </a>
        )}
      </div>
    </div>
  )
}
