// pages/index.tsx
import { RenderBlock } from '@components/render-block'
import directus, { fetchPageData, getMetaData, preload } from '@lib/directus'
import { notFound } from 'next/navigation'
import { z } from 'zod'

export const dynamic = 'error'

// export async function generateStaticParams() {
//   const { data: allPages } = await directus.items('pages').readByQuery({
//     fields: ['translations.languages_code', 'translations.slug', 'status'],
//     filter: {
//       status: {
//         _eq: 'published',
//       },
//     },
//   })

//   if (!allPages?.length) {
//     notFound()
//   }

//   const urls = [] as { slug: string; lang: string }[]

//   allPages.forEach((page) => {
//     if (page.translations) {
//       page.translations.forEach((translation) => {
//         if (typeof translation !== 'number') {
//           if (!translation.languages_code || !translation.slug) {
//             return
//           }
//           urls.push({
//             slug: translation.slug,
//             lang: translation.languages_code?.split('-')[0],
//           })
//         }
//       })
//     }
//   })

//   return urls
// }

export const generateMetadata = async ({
  params,
}: {
  params: { slugs: string[]; lang: string }
}) => {
  // const { slugs, lang } = params

  // const slug = slugs ? slugs.join('/') : ''
  // const pageData = await fetchPageData(slug, lang)

  // const seo = pageData?.seo

  // if (!seo || typeof seo !== 'object' || !seo?.id) {
  //   return null
  // }

  // const metaData = await getMetaData(seo?.id, lang)

  // console.log(metaData?.openGraph?.images)

  return {}
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
