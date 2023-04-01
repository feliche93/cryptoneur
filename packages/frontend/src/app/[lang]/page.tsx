// pages/index.tsx
import { RenderBlock } from '@components/render-block'
import { fetchPageData, getMetaData, preload } from '@lib/directus'
import { notFound } from 'next/navigation'

export const dynamic = 'error'

export const generateMetadata = async ({ params }: { params: { slug: string; lang: string } }) => {
  const { slug, lang } = params
  const pageData = await fetchPageData(slug, lang)

  const seo = pageData?.seo

  if (!seo || typeof seo !== 'object' || !seo?.id) {
    return null
  }

  const metaData = await getMetaData(seo?.id, lang)

  // console.log(metaData?.openGraph?.images)

  return metaData
}

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
