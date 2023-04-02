import { RenderBlock } from '@components/render-block'
import { GrantInfoCard } from '@components/web3-grants/grant/grant-info-card'
import { Header } from '@components/web3-grants/grant/header'
import directus, { fetchPageData, preload } from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import { notFound } from 'next/navigation'

const Web3GrantsDetailPage = async ({ params }: { params: { slug: string; lang: string } }) => {
  const { slug, lang } = params

  const { data } = await directus.items('web3_grants').readByQuery({
    fields: ['slug', 'id'],
    filter: {
      slug: {
        _eq: slug,
      },
    },
  })

  if (!data || data?.length === 0) {
    notFound()
  }

  const id = data[0].id

  if (!id) {
    notFound()
  }

  //   return <pre>{JSON.stringify(data, null, 2)}</pre>

  return (
    <>
      <Header id={id} lang={lang} />
      <GrantInfoCard id={id} lang={lang} />
    </>
  )
}

export default Web3GrantsDetailPage
