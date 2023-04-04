import { RenderBlock } from '@components/render-block'
import { DirectusImage } from '@components/shared/directus-image'
import directus from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import { FC } from 'react'
import { Subtitle } from './subtitle'
import { Title } from './title'
import { DirectusCollections } from '@lib/directus-collections'
import { z } from 'zod'

export const schema = z.object({
  image: z.string().nullable(),
  translations: z.array(
    z.object({
      id: z.number(),
      languages_code: z.string(),
      subtitle: z.string(),
      title: z.string(),
      block_hero_id: z.object({
        buttons: z.array(z.object({ item: z.string(), collection: z.string() })),
      }),
    }),
  ),
})

// @ts-expect-error Server Component
export const BlockHero: FC<BlockType> = async ({ id, lang }) => {
  const data = await directus.items('block_hero').readOne(id, {
    fields: [
      'translations.*',
      'image',
      'translations.block_hero_id.buttons.item',
      'translations.block_hero_id.buttons.collection',
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

  // return <pre>{JSON.stringify(data, null, 2)}</pre>

  const parsedData = schema.parse(data)
  const [translation] = parsedData.translations

  if (!translation) {
    throw new Error(`No translation found for ${lang} in BlockHero ${id}`)
  }

  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center px-4 pt-16 sm:pt-8">
      {parsedData?.image && (
        <DirectusImage
          id={parsedData.image}
          className="h-44 w-44 rounded-full object-contain sm:h-64 sm:w-64"
        />
      )}
      <div className="pt-8 text-center">
        <Title input={translation.title} />
        <Subtitle input={translation.subtitle} />
        <div className="mx-auto mt-5 flex max-w-md flex-col space-y-2 space-x-0 sm:flex sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-2 md:mt-8">
          {translation.block_hero_id.buttons?.map((button, index: number) => {
            if (!button) return null
            return <RenderBlock key={index} block={button} lang={lang} />
          })}
        </div>
      </div>
    </main>
  )
}
