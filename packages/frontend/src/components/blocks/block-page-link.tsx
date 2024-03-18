import { buttonVariants } from '@components/ui/button'
import directus from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import Link from 'next/link'
import { FC } from 'react'
import { z } from 'zod'

const schema = z.object({
  button: z.object({
    size: z.string().optional(),
    shape: z.string().optional(),
    variant: z.string().optional(),
    translations: z.array(z.object({ label: z.string(), languages_code: z.string() })),
  }),
  page: z.object({
    translations: z.array(z.object({ slug: z.string(), languages_code: z.string() })),
  }),
})

// @ts-expect-error Server Component
export const BlockPageLink: FC<BlockType> = async ({ id, lang }) => {
  const data = await directus.items('block_page_link').readOne(id, {
    fields: [
      'button.translations.label',
      'button.translations.languages_code',
      'button.size',
      'button.shape',
      'button.variant',
      'page.translations.slug',
      'page.translations.languages_code',
    ],
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

  const parsedData = schema.parse(data)

  // return <pre className="text-left">{JSON.stringify(parsedData, null, 2)}</pre>

  return (
    <Link
      className={buttonVariants({
        variant: parsedData.button.variant as any,
        size: parsedData.button.size as any,
        shape: parsedData.button.shape as any,
      })}
      href={`/${lang}/${parsedData.page.translations[0].slug}`}
    >
      {parsedData.button.translations[0].label}
    </Link>
  )
}
