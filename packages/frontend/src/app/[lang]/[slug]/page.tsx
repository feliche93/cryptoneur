// pages/index.tsx
import { RenderBlock } from '@components/render-block'
import directus from '@lib/directus'
import { notFound } from 'next/navigation'

const HomePage = async ({ params }: { params: { slug: string; lang: string } }) => {
  const { slug, lang } = params

  const { data: pages } = await directus.items('pages_translations').readByQuery({
    fields: ['*'],
    filter: {
      _and: [
        {
          slug: {
            _starts_with: slug ? slug : 'home',
          },
        },
        {
          languages_code: {
            _starts_with: lang,
          },
        },
      ],
    },
  })

  if (!pages?.length) {
    notFound()
  }

  const [page] = pages

  if (!page.pages_id) {
    notFound()
  }

  const pageData = await directus.items('pages').readOne(page.pages_id, {
    fields: ['id', 'content.collection', 'content.id', 'content.item'],
  })

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
