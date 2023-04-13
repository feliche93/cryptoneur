// pages/index.tsx
import { RenderBlock } from '@components/render-block'
import directus, { fetchPageData, getMetaData, preload } from '@lib/directus'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { z } from 'zod'

export const dynamic = 60

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string; lang: string }
}): Promise<Metadata> => {
  const { lang } = params

  // TODO: get the id from directus
  const metaData = (await getMetaData(4, lang)) as Metadata

  return metaData
}

const schema = z.array(
  z.object({
    id: z.number(),
    languages_code: z.string(),
    slug: z.string(),
    pages_id: z.object({
      content: z.array(z.object({ collection: z.string(), item: z.string() })),
    }),
  }),
)

const HomePage = async ({ params }: { params: { slugs?: string[]; lang: string } }) => {
  const { slugs, lang } = params
  const slug = slugs ? slugs.join('/') : 'home'

  const { data } = await directus.items('pages_translations').readByQuery({
    fields: ['*', 'pages_id.content.collection', 'pages_id.content.item'],
    filter: {
      _and: [
        {
          languages_code: {
            _starts_with: lang,
          },
        },
        {
          slug: {
            _eq: slug,
          },
        },
      ],
    },
  })

  const parsedData = schema.parse(data)

  const [page] = parsedData

  if (!page) {
    notFound()
  }

  return (
    <>
      {page.pages_id.content.map((block, index) => {
        return <RenderBlock key={index} lang={lang} block={block} />
      })}
    </>
  )
}

export default HomePage
