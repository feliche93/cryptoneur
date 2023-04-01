import directus from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import { FC } from 'react'
import { BlockIcon } from './block-icon'

export interface BlockFeatureGridProps {}

// @ts-expect-error Server Component
export const BlockFeatureGrid: FC<BlockType> = async ({ id, lang }) => {
  const data = await directus.items('block_feature_grid').readOne(id, {
    fields: ['*.*.*'],
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

  if (!data) {
    return null
  }

  const translations = data?.translations

  if (!translations?.length || typeof translations[0] === 'number') {
    throw new Error('No translations found')
  }

  const { title, features } = translations[0]

  if (!features || typeof features === 'number') {
    return null
  }

  // return <pre>{JSON.stringify(translations, null, 2)}</pre>

  return (
    <div className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8 lg:py-40">
      <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16">
        <div className="lg:col-span-1">
          <h2 className="text-4xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        </div>
        <dl className="mt-20 grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-x-12 lg:col-span-2 lg:mt-0">
          {features.map((feature: any, index: number) => (
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
