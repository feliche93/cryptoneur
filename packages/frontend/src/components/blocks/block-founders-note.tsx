import { DirectusImage } from '@components/shared/directus-image'
import { GraidentAvatar } from '@components/shared/GradientAvatar'
import directus from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import { FC } from 'react'
import { z } from 'zod'

const schema = z.object({
  founder_avatar: z.string(),
  founder_name: z.string(),
  translations: z.array(
    z.object({
      languages_code: z.string(),
      title: z.string(),
      content: z.string(),
      founder_title: z.string(),
    }),
  ),
})
// @ts-expect-error Server Component
export const BlockFoundersNote: FC<BlockType> = async ({ id, lang }) => {
  const data = await directus.items('block_founders_note').readOne(id, {
    fields: [
      'founder_avatar',
      'founder_name',
      'translations.languages_code',
      'translations.title',
      'translations.content',
      'translations.founder_title',
    ],
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
    <div className="mx-auto my-12 max-w-2xl overflow-hidden rounded-none bg-base-200 shadow sm:rounded-lg">
      <div className="space-y-8 bg-base-100 px-4 py-5 text-2xl sm:p-6">
        <h3 className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-semibold text-transparent">
          {translation.title}
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: translation.content,
          }}
          className="prose"
        />
      </div>
      <div className="bg-base-300 px-4 py-4 sm:px-6">
        <div className="flex items-center justify-start">
          <DirectusImage id={parsedData.founder_avatar} className="h-20 w-20 rounded-full" />
          <div className="ml-4 inline-block">
            <div className="text-xl font-bold text-base-content">{parsedData.founder_name}</div>
            <div className="text-base font-thin text-base-content">{translation.founder_title}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
