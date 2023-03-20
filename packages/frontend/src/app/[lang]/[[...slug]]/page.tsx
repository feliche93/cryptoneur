// pages/index.tsx
import { RenderBlock } from '@components/render-block'
import directus from '@lib/directus'
import { notFound } from 'next/navigation'

const HomePage = async ({ params }: { params: { slug: string; lang: string } }) => {
  const { data } = await directus.items('pages').readByQuery({
    fields: ['content.collection', 'content.id'],
  })

  const { slug, lang } = params

  if (!data?.length) {
    return notFound()
  }

  const content = data[0].content

  if (!content?.length) {
    return notFound()
  }

  return (
    <>
      {content.map((block, index) => {
        return <RenderBlock key={index} lang={lang} block={block} />
      })}
    </>
  )
}

export default HomePage
