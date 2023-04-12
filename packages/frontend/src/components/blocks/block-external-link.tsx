import { buttonVariants } from '@components/ui/button'
import directus from '@lib/directus'
import { DirectusCollections } from '@lib/directus-collections'
import { BlockType } from '@lib/directus.types'
import Link from 'next/link'
import { FC } from 'react'
import { z } from 'zod'

const schema = z.object({
  href: z.string(),
  target: z.null(),
  rel: z.null(),
  button: z.object({
    variant: z.string(),
    size: z.string(),
    shape: z.string(),
    translations: z.array(z.object({ languages_code: z.string(), label: z.string() })),
  }),
})

// @ts-expect-error Server Component
export const BlockExternalLink: FC<BlockType> = async ({ id, lang }) => {
  const data = await directus.items('block_external_link').readOne(id, {
    fields: [
      'button.variant',
      'button.size',
      'button.shape',
      'button.translations.languages_code',
      'button.translations.label',
      'href',
      'target',
      'rel',
    ],
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

  const parsedData = schema.parse(data)

  // return <pre className="text-left">{JSON.stringify(data, null, 2)}</pre>

  return (
    <Link
      // rel={parsedData.rel ?? undefined}
      // target={parsedData.target ?? undefined}
      className={buttonVariants({
        variant: parsedData.button.variant as any,
        size: parsedData.button.size as any,
        shape: parsedData.button.shape as any,
      })}
      href={`/${lang}/${parsedData.href}`}
    >
      {parsedData.button.translations[0].label}
    </Link>
  )
}
