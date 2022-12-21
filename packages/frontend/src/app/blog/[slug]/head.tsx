import { NextSeo } from 'next-seo'
import type { NextSeoProps } from 'next-seo'
import { NEXT_SEO_DEFAULT } from '@/../next-seo.config' // your path will vary
import { strapi } from '@shared/strapi'
import { headers } from 'next/headers'

export default async function Head({ params: { slug } }: { params: { slug: string } }) {
  const { data: posts, meta } = await strapi.find<any[]>('posts', {
    populate: 'deep',
    filters: {
      slug: {
        $eq: slug,
      },
    },
  })

  const headerList = headers()
  const referer = headerList.get('referer')

  const [post] = posts
  const seo = post?.attributes?.seo
  const { openGraph } = seo

  //   console.log({ post })
  //   console.log(openGraph?.images?.data)

  const updateMeta: NextSeoProps = {
    ...NEXT_SEO_DEFAULT,
    title: seo?.title,
    description: seo?.description,
    noindex: seo?.noIndex,
    nofollow: seo?.noFollow,
    openGraph: {
      title: openGraph?.title,
      description: openGraph?.description,
      url: referer || 'https://cryptoneur.xyz/blog/' + slug,
      images: openGraph?.images?.data?.map((image: any) => ({
        url: image?.attributes?.url,
        width: image?.attributes?.width,
        height: image?.attributes?.height,
        alt: image?.attributes?.alternativeText,
      })),
      type: openGraph?.type,
      article: {
        publishedTime: post?.attributes?.createdAt,
        modifiedTime: post?.attributes?.updatedAt,
        authors: [post?.attributes?.authors?.data[0].attributes?.name],
        tags: post?.attributes?.tags?.data?.map((tag: any) => tag?.attributes?.name),
      },
    },
  }

  //   console.log(updateMeta.openGraph)

  return <NextSeo {...updateMeta} useAppDir={true} />
}
