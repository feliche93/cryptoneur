// pages/index.tsx
import { RenderBlock } from '@components/render-block'
import { getMetaData, getPageData } from '@lib/directus'
import { Metadata } from 'next'

export const dynamic = 60

type PageParams = {
  slugs?: string[]
  lang: string
}

export const generateMetadata = async ({ params }: { params: PageParams }): Promise<Metadata> => {
  const { lang, slugs } = params
  const slug = slugs ? slugs.join('/') : 'home'

  const page = await getPageData({ slug, lang })

  const metaData = (await getMetaData({ id: page.id, lang })) as Metadata

  return metaData
}

const HomePage = async ({ params }: { params: PageParams }) => {
  const { slugs, lang } = params
  const slug = slugs ? slugs.join('/') : 'home'

  const page = await getPageData({ slug, lang })

  return (
    <>
      {page.pages_id.content.map((block, index) => {
        return <RenderBlock key={index} lang={lang} block={block} />
      })}
    </>
  )
}

export default HomePage
