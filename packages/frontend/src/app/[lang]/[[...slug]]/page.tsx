// pages/index.tsx
import { RenderBlock } from '@components/render-block'
import directus from '@lib/directus'
import { DirectusCollections } from '@lib/directus-collections'
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
      {content.map((block) => {
        return <RenderBlock lang={lang} block={block} />
      })}
    </>
  )

  // return <pre>{JSON.stringify(data, null, 2)}</pre>

  // return <Hero />
}

export default HomePage
