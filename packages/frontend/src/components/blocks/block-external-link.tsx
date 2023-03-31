import { buttonVariants } from '@components/ui/button'
import directus from '@lib/directus'
import { DirectusCollections } from '@lib/directus-collections'
import { BlockType } from '@lib/directus.types'
import Link from 'next/link'
import { FC } from 'react'

// @ts-expect-error Server Component
export const BlockExternalLink: FC<BlockType> = async ({ id, lang }) => {
  const data = await directus.items('block_external_link').readOne(id, {
    fields: ['button.*.*', '*'],
    deep: {
      button: {
        translations: {
          _filter: {
            languages_code: {
              _starts_with: lang,
            },
          },
        },
      },
    },
  })

  if (!data) throw Error(`No data found for block ${id}`)

  const href = data?.href

  if (!href) {
    throw Error(`No href found for block ${id}`)
  }

  const button = data?.button as DirectusCollections['block_external_link']['button']

  if (!button || typeof button === 'number') {
    throw Error(`No button found for block ${id}`)
  }

  const translation = button?.translations?.[0]

  if (!translation || typeof translation === 'number') {
    throw Error(`No translations found for button ${id}`)
  }

  const { label } = translation
  const { variant, size, shape } = button

  if (!variant || !size || !shape) {
    throw Error(`Missing data for block ${id}`)
  }

  return (
    <Link
      className={buttonVariants({
        variant: variant as any,
        size: size as any,
        shape: shape as any,
      })}
      href={`/${lang}/${href}`}
    >
      {label}
    </Link>
  )
}
