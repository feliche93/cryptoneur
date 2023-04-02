import directus from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import { FC } from 'react'
import { BlockFaqWrapper } from './block-faq-wrapper'
import { z } from 'zod'

const schema = z.object({
  translations: z.array(
    z.object({
      title: z.string(),
      languages_code: z.string(),
      faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
    }),
  ),
})

// @ts-expect-error Server Component
export const BlockFaq: FC<BlockType> = async ({ id, lang }) => {
  const data = await directus.items('block_faq').readOne(id, {
    fields: ['translations.title', 'translations.languages_code', 'translations.faqs'],
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

  return <BlockFaqWrapper title={translation.title} faqs={translation.faqs} />
}
