// pages/index.tsx
import { BlockIcon } from '@components/blocks/block-icon'
import { RenderBlock } from '@components/render-block'
import directus from '@lib/directus'
import Image from 'next/image'
import { notFound } from 'next/navigation'

const HomePage = async ({ params }: { params: { slug: string; lang: string } }) => {
  const { data } = await directus.items('pages').readByQuery({
    fields: ['content.collection', 'content.id', 'content.item'],
  })

  const { slug, lang } = params

  if (!data?.length) {
    return notFound()
  }

  const content = data[0].content

  if (!content || content.length === 0 || typeof content === 'number') {
    return notFound()
  }

  // return <pre>{JSON.stringify(content, null, 2)}</pre>

  return (
    <>
      {content.map((block, index) => {
        return <RenderBlock key={index} lang={lang} block={block} />
      })}
    </>
  )
}

export default HomePage
