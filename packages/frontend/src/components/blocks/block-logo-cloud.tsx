import { DirectusImage } from '@components/shared/directus-image'
import directus from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import Link from 'next/link'
import { FC } from 'react'
import { z } from 'zod'

const schema = z.object({
  translations: z.array(z.object({ languages_code: z.string(), section: z.string() })),
  images: z.array(z.object({ directus_files_id: z.string() })),
})

// @ts-expect-error Server Component
export const BlockLogoCloud: FC<BlockType> = async ({ id, lang }) => {
  const data = await directus.items('block_logo_cloud').readOne(id, {
    fields: ['translations.languages_code', 'translations.section', 'images.directus_files_id'],
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

  const parsedData = schema.parse(data)

  const [translation] = parsedData.translations

  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <p className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-base font-semibold uppercase tracking-wider text-transparent">
          {translation.section}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:mt-8">
          {parsedData.images.map((image, index) => {
            console.log({ image })

            if (image.directus_files_id === '47903e6e-2b96-44fc-a1dc-79b7e73e7022')
              return (
                <Link target={'_blank'} href={'https://moneycoach.ai/'}>
                  <div
                    key={index}
                    className="col-span-1 flex justify-center rounded-lg bg-base-100 p-5"
                  >
                    <DirectusImage
                      className="h-24 w-auto object-contain"
                      id={image.directus_files_id}
                    />
                  </div>
                </Link>
              )

            if (image.directus_files_id === '4da637fc-142e-4e0c-98f8-a7c531c0ca8e')
              return (
                <Link target={'_blank'} href={'https://www.giftideasai.xyz/'}>
                  <div
                    key={index}
                    className="col-span-1 flex justify-center rounded-lg bg-base-100 p-5"
                  >
                    <DirectusImage
                      className="h-24 w-auto object-contain"
                      id={image.directus_files_id}
                    />
                  </div>
                </Link>
              )

            if (image.directus_files_id === 'e95b6bac-7afe-4a34-ac05-d8e38b0e382d')
              return (
                <Link target={'_blank'} href={'https://www.backlinkgpt.com/'}>
                  <div
                    key={index}
                    className="col-span-1 flex justify-center rounded-lg bg-base-100 p-5"
                  >
                    <DirectusImage
                      className="h-24 w-auto object-contain"
                      id={image.directus_files_id}
                    />
                  </div>
                </Link>
              )

            return (
              <div
                key={index}
                className="col-span-1 flex justify-center rounded-lg bg-base-100 p-5"
              >
                <DirectusImage
                  className="h-24 w-auto object-contain"
                  id={image.directus_files_id}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
