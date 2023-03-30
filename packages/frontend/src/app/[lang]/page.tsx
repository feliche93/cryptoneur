// pages/index.tsx
import { RenderBlock } from '@components/render-block'
import { fetchPageData, preload } from '@lib/directus'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

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
