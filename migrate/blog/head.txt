import { NextSeo } from 'next-seo'
import type { NextSeoProps } from 'next-seo'
import { NEXT_SEO_DEFAULT } from '@/../next-seo.config' // your path will vary
import { strapi } from '@shared/strapi'
import { headers } from 'next/headers'

export default async function Head({ params: { slug } }: { params: { slug: string } }) {
  const headerList = headers()
  const referer = headerList.get('referer')

  //   console.log({ post })
  //   console.log(openGraph?.images?.data)

  const updateMeta: NextSeoProps = {
    ...NEXT_SEO_DEFAULT,
    title: 'Cryptoneur Blog',
    description:
      'Welcome to my personal blog, where you can find in-depth tutorials and guides on the latest crypto and tech trends.',
    openGraph: {
      title: 'Cryptoneur Blog',
      description:
        'Welcome to my personal blog, where you can find in-depth tutorials and guides on the latest crypto and tech trends.',
      url: referer || 'https://cryptoneur.xyz/blog/' + slug,
      type: 'website',
    },
  }

  console.log({ updateMeta })

  return <NextSeo {...updateMeta} useAppDir={true} />
}
