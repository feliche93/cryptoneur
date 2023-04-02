import { RenderBlock } from '@components/render-block'
import { GrantInfoCard } from '@components/web3-grants/grant/grant-info-card'
import { Header } from '@components/web3-grants/grant/header'
import directus, { fetchPageData, preload } from '@lib/directus'
import { BlockType } from '@lib/directus.types'
import { notFound } from 'next/navigation'
import { z } from 'zod'

const grantDataSchema = z.array(z.object({ slug: z.string(), id: z.number() }))

const Web3GrantsDetailPage = async ({ params }: { params: { slug: string; lang: string } }) => {
  const { slug, lang } = params

  const { data: grantData } = await directus.items('web3_grants').readByQuery({
    fields: ['slug', 'id'],
    filter: {
      slug: {
        _eq: slug,
      },
    },
  })

  const parsedGrantData = grantDataSchema.parse(grantData)

  const [grant] = parsedGrantData

  return (
    <>
      <Header id={grant.id} lang={lang} />
      <GrantInfoCard id={grant.id} lang={lang} />
    </>
  )
}

export default Web3GrantsDetailPage
