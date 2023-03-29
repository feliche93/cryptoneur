import { buttonVariants } from '@components/ui/button'
import directus from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import Link from 'next/link'
import { FC } from 'react'

// @ts-expect-error Server Component
export const BlockPageLink: FC<BlockType> = async ({ id, lang }) => {
  const data = await directus.items('block_page_link').readOne(id, {
    fields: ['button.*.*', 'page.translations.*'],
    deep: {
      translations: {
        _filter: {
          languages_code: {
            _starts_with: lang,
          },
        },
      },
      page: {
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

  const page = data?.page
  const button = data?.button

  if (!page || typeof page === 'number') {
    throw Error(`No page found for block ${id}`)
  }

  if (!button || typeof button === 'number') {
    throw Error(`No button found for block ${id}`)
  }

  const translationsPage = page?.translations
  const translationsButton = button?.translations

  if (
    !translationsPage ||
    typeof translationsPage[0] === 'number' ||
    translationsPage?.length === 0
  ) {
    throw Error(`No translations found for page ${id}`)
  }

  if (
    !translationsButton ||
    typeof translationsButton[0] === 'number' ||
    translationsButton?.length === 0
  ) {
    throw Error(`No translations found for button ${id}`)
  }

  const { slug } = translationsPage[0]
  const { label } = translationsButton[0]
  const { variant, size, shape } = button

  if (!slug || !label || !variant || !size || !shape) {
    throw Error(`Missing data for block ${id}`)
  }

  return (
    <Link
      className={buttonVariants({
        variant: variant as any,
        size: size as any,
        shape: shape as any,
      })}
      href={`/${lang}/${slug}`}
    >
      {label}
    </Link>
  )
}
