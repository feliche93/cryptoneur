import { RenderComponent } from '@components/blog/RenderComponent'
import { strapi } from '@shared/strapi'
import dayjs from 'dayjs'
import Image from 'next/image'
import { Fragment } from 'react'

export default async function BlogDetail({ params }) {
  const { slug } = params

  const { data: posts, meta } = await strapi.find('posts', {
    populate: 'deep',
    filters: {
      slug: {
        $eq: slug,
      },
    },
  })

  const [post] = posts

  return (
    <>
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
              {dayjs(post?.updatedAt).format('MMMM DD, YYYY')}
            </div>
          </div>
        </div>
        <section className="prose prose-lg prose-blue mx-4 bg-base-200 sm:mx-auto">
          {post?.attributes?.content.map((component) => {
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
