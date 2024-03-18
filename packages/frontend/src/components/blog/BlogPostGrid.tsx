import { strapi } from '@/shared/strapi'
import { BlogPostCard } from './BlogPostCard'

type Props = {}

export default async function BlogPostGrid({}: Props) {
  const { data: posts, meta } = await strapi.find<Strapi.Schemas['api::post.post'][]>('posts', {
    populate: 'deep',
  })

  // console.log({ posts })

  return (
    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      {posts.map((post) => (
        <BlogPostCard key={(post as any)?.id} post={post?.attributes} />
      ))}
    </div>
  )
}
