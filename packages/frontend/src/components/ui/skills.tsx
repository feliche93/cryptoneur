import { AtomIcon, BrainCircuit, Megaphone } from 'lucide-react'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { FC } from 'react'
import { Card } from './card'

export interface SkillsProps {
  locale: string
}
export const Skills: FC<SkillsProps> = async ({ locale }) => {
  unstable_setRequestLocale(locale || 'en')

  const t = await getTranslations('components.skills')

  const features = [
    {
      title: 'Full-Stack Development',
      description: t('fullstack.description'),
      icon: AtomIcon,
      languages: ['Javascript', 'Typescript', 'CSS', 'HTML'],
      tools: [
        'Next.js / Next14',
        'Tailwind CSS & UI / Daisy UI / ShadcnUI',
        'React Hook Form',
        'Tanstack Table',
        'Clerk Auth',
        'Drizzle ORM',
        'Directus & Strapi CMS',
      ],
    },
    {
      title: 'Data & AI Services',
      description: t('dataAndAI.description'),
      icon: BrainCircuit,
      languages: ['Python', 'SQL'],
      tools: [
        'Langchain',
        'Postgres: Neon / Supabase',
        'DBT',
        'Pandas',
        'Modal',
        'Superset',
        'Airbyte',
        'Great Expectations',
        'FastAPI',
      ],
    },
    {
      title: 'Business & Marketing',
      description: t('businessAndMarketing.description'),
      icon: Megaphone,
      languages: ['SEO & SEA', 'Agile Sprints', 'BizDev'],
      tools: [
        'Ahrefs',
        'Google Search Console',
        'Google Tag Manager',
        'Posthog',
        'Linear',
        'Pipedream',
      ],
    },
  ]

  return (
    <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="mt-20">
        <div className="grid grid-cols-1 gap-12 lg:gap-8 sm:grid-cols-1 lg:grid-cols-3">
          {features.map((feature, index: number) => (
            <Card key={index}>
              <div className="flow-root h-full rounded-lg px-6 pb-8 shadow">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-primary p-3 shadow-lg">
                      <feature.icon
                        className="h-6 w-6 text-primary-foreground"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-semibold tracking-tight">{feature.title}</h3>
                  <div className="text-sm mt-5 h-fit lg:h-20 min-h-fit lg:min-h-max">
                    {feature.description}
                  </div>
                  <div className="pt-6">
                    <p className="text-sm text-muted-foreground">{t('languages')}</p>
                    <p className="mt-4">{feature?.languages.join(', ')}</p>
                  </div>
                  <div className="pt-8">
                    <p className="text-sm text-muted-foreground">{t('tools')}</p>
                    <ul className="mt-4 space-y-2">
                      {feature?.tools.map((tool, index) => <li key={index}>{tool}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
