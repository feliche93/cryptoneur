import { DirectusImage } from '@components/shared/directus-image'
import { GraidentAvatar } from '@components/shared/GradientAvatar'
import directus from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import { FC } from 'react'

// @ts-expect-error Server Component
export const BlockFoundersNote: FC<BlockType> = async ({ id, lang }) => {
  const data = await directus.items('block_founders_note').readOne(id, {
    fields: ['founder_avatar', 'founder_name', 'translations.*'],
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
  const founderAvatar = data?.founder_avatar
  const founderName = data?.founder_name

  if (!translations?.length || typeof translations[0] === 'number') {
    throw new Error(`No translations found for block ${id}`)
  }

  if (!founderAvatar || typeof founderAvatar !== 'string') {
    throw new Error(`No founder avatar found for block ${id}`)
  }

  if (!founderName || typeof founderName !== 'string') {
    throw new Error(`No founder name found for block ${id}`)
  }

  const title = translations[0]?.title
  const content = translations[0]?.content
  const founderTitle = translations[0]?.founder_title

  if (!title || typeof title !== 'string') {
    throw new Error(`No title found for block ${id}`)
  }

  if (!content || typeof content !== 'string') {
    throw new Error(`No content found for block ${id}`)
  }

  if (!founderTitle || typeof founderTitle !== 'string') {
    throw new Error(`No founder title found for block ${id}`)
  }

  return (
    <div className="mx-auto my-12 max-w-2xl overflow-hidden rounded-none bg-base-200 shadow sm:rounded-lg">
      <div className="space-y-8 bg-base-100 px-4 py-5 text-2xl sm:p-6">
        <h3 className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-semibold text-transparent">
          {title}
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: content,
          }}
          className="prose"
        />
      </div>
      <div className="bg-base-300 px-4 py-4 sm:px-6">
        <div className="flex items-center justify-start">
          <DirectusImage id={founderAvatar} className="h-20 w-20 rounded-full" />
          <div className="ml-4 inline-block">
            <div className="text-xl font-bold text-base-content">{founderTitle}</div>
            <div className="text-base font-thin text-base-content">{founderTitle}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
