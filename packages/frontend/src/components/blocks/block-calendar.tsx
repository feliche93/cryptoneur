import { CalCom } from '@components/cal-com'
import directus from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import dynamic from 'next/dynamic'
import { FC } from 'react'

// @ts-expect-error Server Component
export const BlockCalendar: FC<BlockType> = async ({ lang, id }) => {
  const data = await directus.items('block_cal').readOne(id, {
    fields: ['*.*'],
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
  const url = data?.url

  if (
    !translations?.length ||
    typeof translations[0] === 'number' ||
    !url ||
    typeof url === 'number'
  ) {
    throw new Error('No translations found')
  }

  const { section, title } = translations[0]

  if (!section || !title) {
    throw new Error('Missing data')
  }

  return (
    <div className="relative pt-16 sm:pt-24 lg:pt-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-base font-semibold uppercase tracking-wider text-transparent">
          {section}
        </h2>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </p>
      </div>
      <div className="w-auto overflow-hidden pt-10" id="my-cal-inline"></div>
      <CalCom />
    </div>
  )
}
