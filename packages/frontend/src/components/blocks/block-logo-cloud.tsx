import { DirectusImage } from '@components/shared/directus-image'
import directus from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import Image from 'next/image'

import { FC } from 'react'

// @ts-expect-error Server Component
export const BlockLogoCloud: FC<BlockType> = async ({ id, lang }) => {
  const data = await directus.items('block_logo_cloud').readOne(id, {
    fields: ['*.*', 'images.directus_files_id'],
    deep: {
      translations: {
        _filter: {
          languages_code: {
            _starts_with: lang,
          },
        },
      },
    },
  })

  const translations = data?.translations
  const images = data?.images

  if (
    !translations?.length ||
    typeof translations[0] === 'number' ||
    !images?.length ||
    typeof images === 'number'
  ) {
    throw new Error('No translations found')
  }

  const { section } = translations[0]

  if (!section || images?.length === 0) {
    throw new Error('Missing data')
  }

  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-base font-semibold uppercase tracking-wider text-transparent">
          {section}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:mt-8">
          {images.map((image, index) => (
            <div key={index} className="col-span-1 flex justify-center rounded-lg bg-base-100 p-5">
              <DirectusImage className="h-24 w-auto object-contain" id={image.directus_files_id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
