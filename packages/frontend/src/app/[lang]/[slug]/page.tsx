// pages/index.tsx
import { RenderBlock } from '@components/render-block'
import { fetchPageData, preload } from '@lib/directus'
import { notFound } from 'next/navigation'

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

const HomePage = async ({ params }: { params: { slug: string; lang: string } }) => {
  const { slug, lang } = params
  preload(slug, lang)

  const pageData = await fetchPageData(slug, lang)

  if (!pageData || pageData?.content === undefined) {
    notFound()
  }

  return (
    <>
      {pageData.content.map((block, index) => {
        return <RenderBlock key={index} lang={lang} block={block} />
      })}
    </>
  )
}

export default HomePage
