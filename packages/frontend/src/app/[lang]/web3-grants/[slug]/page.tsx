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
      <main className="py-10">
        {/* Page header */}
        <Header id={grant.id} lang={lang} />

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2 lg:col-start-1">
            {/* Description list*/}

            <GrantInfoCard id={grant.id} lang={lang} />
            {/* <GrantRfps
        title="RFPs"
        slug={slug}
        description="All suggested ideas and projects from grant givers themeselves."
      /> */}
          </div>
        </div>
      </main>
    </>
  )
}

export default Web3GrantsDetailPage
