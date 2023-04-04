import { CalCom } from '@components/cal-com'
import directus from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { z } from 'zod'

const schema = z.object({
  url: z.string(),
  translations: z.array(
    z.object({
      languages_code: z.string(),
      section: z.string(),
      title: z.string(),
    }),
  ),
})

// @ts-expect-error Server Component
export const BlockCalendar: FC<BlockType> = async ({ lang, id }) => {
  const data = await directus.items('block_cal').readOne(id, {
    fields: ['url', 'translations.languages_code', 'translations.section', 'translations.title'],
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
    <div className="relative pt-16 sm:pt-24 lg:pt-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-base font-semibold uppercase tracking-wider text-transparent">
          {translation.section}
        </h2>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {translation.title}
        </p>
      </div>
      <div className="w-auto overflow-hidden pt-10" id="my-cal-inline"></div>
      <CalCom url={parsedData.url} />
    </div>
  )
}
