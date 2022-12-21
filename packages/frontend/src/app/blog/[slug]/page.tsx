import { RenderComponent } from '@components/blog/RenderComponent'
import { strapi } from '@shared/strapi'
import dayjs from 'dayjs'
import { ArticleJsonLd } from 'next-seo'
import Image from 'next/image'
import { Fragment } from 'react'
import { headers } from 'next/headers'

export default async function BlogDetail({ params: { slug } }: { params: { slug: string } }) {
  const { data: posts, meta } = await strapi.find<Strapi.Schemas['api::post.post'][]>('posts', {
    populate: 'deep',
    filters: {
      slug: {
        $eq: slug,
      },
    },
  })

  const [post] = posts
  const headerList = headers()
  const referer = headerList.get('referer')

  // console.log({ referer })

  return (
    <>
      <ArticleJsonLd
        useAppDir={true}
        url={referer || 'https://cryptoneur.xyz/blog/' + slug}
        title={post?.attributes?.title}
        images={[post?.attributes?.cover?.data?.attributes?.url]}
        datePublished={post?.attributes?.createdAt}
        dateModified={post?.attributes?.updatedAt}
        authorName={post?.attributes?.authors?.name}
        publisherName="Cryptoneur"
        publisherLogo="https://cryptoneur.io/favicon.ico"
        description={post?.attributes?.seo?.description}
      />
      <article className="mx-4 sm:mx-auto">
        <div className="flex items-center justify-center">
          <Image
            src={post?.attributes?.cover?.data?.attributes?.url}
            width={post?.attributes?.cover?.data?.attributes?.width}
            height={post?.attributes?.cover?.data?.attributes?.height}
            className="rounded-xl object-contain"
            priority={true}
            alt={post?.attributes?.cover?.data?.attributes?.alternativeText}
          />
        </div>
        <h1 className="mx-4 mt-2 block py-8 text-center text-4xl font-extrabold leading-8 tracking-tight text-gray-900 sm:mx-auto sm:max-w-3xl sm:text-5xl">
          {post?.attributes?.title}
        </h1>
        <div className="group flex items-center justify-center pb-6">
          <Image
            width={80}
            height={80}
            className="rounded-full object-contain"
            src={post?.attributes?.authors?.data[0].attributes?.avatar?.data?.attributes?.url}
            alt={post?.attributes?.authors?.name}
          />
          <div className="ml-3">
            <div className="block text-xl font-medium text-gray-700">
              {post?.attributes?.authors?.name}
            </div>
            <div className="block text-base font-medium text-gray-600">
              {dayjs(post?.attributes?.updatedAt).format('MMMM DD, YYYY')}
            </div>
          </div>
        </div>
        <section className="prose prose-lg prose-blue mx-4 bg-base-200 sm:mx-auto">
          {post?.attributes?.content.map((component: any) => {
            // console.log(`${component.id}-${component['__component']}`)
            return (
              <Fragment key={`${component.id}-${component['__component']}`}>
                <RenderComponent component={component} />
              </Fragment>
            )
          })}
        </section>
      </article>
    </>
  )
}
