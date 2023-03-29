import directus from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import { FC } from 'react'
import { BlockIcon } from './block-icon'

export interface BlockFeaturesProps {}

// @ts-expect-error Server Component
export const BlockFeatures: FC<BlockType> = async ({ id, lang }) => {
  const data = await directus.items('block_features').readOne(id, {
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

  const { title, features, section } = translations[0]

  if (!features || features.length === 0 || typeof features === 'number') {
    return null
  }

  // return <pre>{JSON.stringify(translations, null, 2)}</pre>

  return (
    <div className="relative pt-16 sm:pt-24 lg:pt-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-base font-semibold uppercase tracking-wider text-transparent">
          {section}
        </h2>
        <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</p>
        {/* <p className="mx-auto mt-5 max-w-prose text-xl text-base-content/80">
          I am a self-taught programmer with a CEMS Master in International Management. Having both
          a business and deep technical understanding allows me to easily communicate complex
          technical ideas with business stakeholders.
        </p> */}
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 lg:grid-cols-3">
            {features.map((feature: any) => (
              <div key={feature.id} className="pt-6">
                <div className="flow-root h-full rounded-lg bg-base-100 px-6 pb-8 shadow">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-primary p-3 shadow-lg">
                        <BlockIcon iconName={feature.icon} color="text-white" size={6} />
                        {/* <skill.icon className="h-6 w-6 text-primary-content" aria-hidden="true" /> */}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight">{feature.title}</h3>
                    <div
                      className="prose-base-content/80 prose mt-5 prose-ul:p-0 prose-li:list-none prose-li:text-sm"
                      dangerouslySetInnerHTML={{ __html: feature.description }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
