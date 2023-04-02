import directus from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import { FC } from 'react'
import { BlockIcon } from './block-icon'
import { z } from 'zod'

const schema = z.object({
  translations: z.array(
    z.object({
      features: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
        }),
      ),
      title: z.string(),
      languages_code: z.string(),
    }),
  ),
})

// @ts-expect-error Server Component
export const BlockFeatureGrid: FC<BlockType> = async ({ id, lang }) => {
  const data = await directus.items('block_feature_grid').readOne(id, {
    fields: ['translations.features', 'translations.title', 'translations.languages_code'],
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

  if (!translation) {
    throw new Error(`No translation found for language ${lang} and block ${id}`)
  }

  return (
    <div className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8 lg:py-40">
      <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16">
        <div className="lg:col-span-1">
          <h2 className="text-4xl font-bold tracking-tight sm:text-4xl">{translation.title}</h2>
        </div>
        <dl className="mt-20 grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-x-12 lg:col-span-2 lg:mt-0">
          {translation.features.map((feature, index: number) => (
            <div key={index}>
              <dt>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-content">
                  <BlockIcon
                    iconName={feature.icon}
                    color="text-white"
                    size={6}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-6 text-lg font-semibold leading-8">{feature.title}</p>
              </dt>
              <dd className="mt-2 h-full">
                <div
                  className="prose-base-content/80 prose h-full prose-ul:p-0 prose-li:list-none prose-li:text-sm"
                  dangerouslySetInnerHTML={{ __html: feature.description }}
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
