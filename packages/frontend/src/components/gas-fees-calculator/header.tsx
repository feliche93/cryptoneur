import directus from '@lib/directus'
import { FC } from 'react'

interface Translation {
  header_title: string
  head_subtitle: string
  header_description: string
}

interface Translations {
  languages_code: string
  translations: Translation[]
}

interface HeaderProps {
  lang: string
}

// @ts-expect-error Server Component
export const Header: FC<HeaderProps> = async ({ lang }) => {
  const { translations } = (await directus.singleton('gas_fees_calculator').read({
    fields: [
      'translations.languages_code',
      'translations.header_title',
      'translations.head_subtitle',
      'translations.header_description',
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
  })) as Translations

  const translation = translations?.[0]

  if (!translation) {
    throw new Error('Translation not found')
  }

  const { header_title, head_subtitle, header_description } = translation

  if (
    typeof header_title !== 'string' ||
    typeof head_subtitle !== 'string' ||
    typeof header_description !== 'string'
  ) {
    throw new Error('Invalid translation format')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-5 sm:px-6 sm:pt-12 lg:px-8">
      <div className="text-center">
        <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-base font-semibold uppercase tracking-wide text-transparent">
          {header_title}
        </h2>
        <p className="mt-1 text-3xl font-extrabold sm:text-4xl sm:tracking-tight lg:text-4xl">
          {head_subtitle}
        </p>
        <p className="mx-auto mt-5 max-w-4xl text-lg text-base-content/80">{header_description}</p>
      </div>
    </div>
  )
}
