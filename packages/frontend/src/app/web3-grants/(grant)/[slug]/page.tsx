export const revalidate = 60

import { GrantInfoCard } from '@components/web3-grants/grant/GrantInfoCard'
import { Header } from '@components/web3-grants/grant/Header'
import { createServerClient } from '@utils/supabase-server'
import { Metadata, NextPage } from 'next'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'

interface Params {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const supabase = createServerClient()

  const { data: grant, error: grantError } = await supabase
    .from('grants')
    .select('*')
    .eq('slug', params.slug)
    .maybeSingle()

  if (grantError || !grant) {
    return {}
  }

  return {
    title: grant.name,
    description: grant.description,
    openGraph: {
      title: grant.name,
      description: grant.description ? grant.description : '',
      images: [
        {
          url: grant.logo,
          width: 800,
          height: 600,
          alt: grant.name,
        },
      ],
    },
  }
}

const Web3GrantPage = ({ params }: Params) => {
  const { slug } = params

  return (
    <>
      <main className="py-10">
        {/* Page header */}
        <Header slug={slug} />

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2 lg:col-start-1">
            {/* Description list*/}

            <GrantInfoCard
              title="Grant Info"
              description="All high-level infromation about the grant."
              slug={slug}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default Web3GrantPage
