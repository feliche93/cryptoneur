import directus from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import { FC } from 'react'
import { BlockFaqWrapper } from './block-faq-wrapper'

// @ts-expect-error Server Component
export const BlockFaq: FC<BlockType> = async ({ id, lang }) => {
  const data = await directus.items('block_faq').readOne(id, {
    fields: ['translations.*', 'translations.languages_code'],
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

  if (!translations?.length || typeof translations[0] === 'number') {
    throw new Error('No translations found')
  }

  const { title, faqs } = translations[0]

  if (!faqs || typeof faqs === 'number') {
    throw new Error(`No faqs found for block ${id}`)
  }

  if (!title || typeof title !== 'string') {
    throw new Error(`No title found for block ${id}`)
  }

  return <BlockFaqWrapper title={title} faqs={faqs} />
}
