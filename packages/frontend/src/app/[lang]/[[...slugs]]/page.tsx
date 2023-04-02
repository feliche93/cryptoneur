// pages/index.tsx
import { RenderBlock } from '@components/render-block'
import { fetchPageData, getMetaData, preload } from '@lib/directus'
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

export const generateMetadata = async ({
  params,
}: {
  params: { slugs: string[]; lang: string }
}) => {
  const { slugs, lang } = params

  const slug = slugs ? slugs.join('/') : ''
  const pageData = await fetchPageData(slug, lang)

  const seo = pageData?.seo

  if (!seo || typeof seo !== 'object' || !seo?.id) {
    return null
  }

  const metaData = await getMetaData(seo?.id, lang)

  // console.log(metaData?.openGraph?.images)

  return metaData
}

const HomePage = async ({ params }: { params: { slugs: string[]; lang: string } }) => {
  const { slugs, lang } = params

  const slug = slugs ? slugs.join('/') : ''
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
