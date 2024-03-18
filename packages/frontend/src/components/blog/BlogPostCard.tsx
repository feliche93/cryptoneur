import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export interface BlogPostCardProps {
  post: any
  id: string
}
export const BlogPostCard: FC<BlogPostCardProps> = ({ post, id }) => {
  // console.log(post)

  return (
    <div key={post?.title} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <Image
          className="aspect-video w-full object-cover"
          src={post?.cover?.data?.attributes?.url}
          width={post?.cover?.data?.attributes?.width}
          height={post?.cover?.data?.attributes?.height}
          alt={post?.cover?.data?.attributes?.alternativeText}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-base-100 p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-primary">
            {post?.tags?.data.map((tag: any) => {
              return (
                <Link
                  key={tag?.id}
                  href={`/blog/tag/${tag?.attributes?.name.toLowerCase()}`}
                  className="mr-2 hover:underline"
                >
                  {tag?.attributes?.name}
                </Link>
              )
            })}
          </p>
          <Link href={`/blog/${post?.slug}`} className="mt-2 block">
            <p className="font-semibol text-xl">{post.title}</p>
            <p className="mt-3 text-base text-base-content/80">{post.description}</p>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <Link href={'/blog'}>
              <span className="sr-only">{post?.authors?.data[0]?.attributes?.name}</span>
              <Image
                width={50}
                height={50}
                className="rounded-full object-contain"
                src={post.authors.data[0].attributes?.avatar?.data?.attributes?.url}
                alt={post?.authors?.data[0]?.attributes?.name}
              />
            </Link>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">
              <Link href={'/blog'} className="hover:underline">
                {post?.authors?.data[0]?.attributes?.name}
              </Link>
            </p>
            <div className="flex space-x-1 text-sm text-base-content/80">
              <time dateTime={post?.createdAt}>
                {dayjs(post?.createdAt).format('MMMM DD, YYYY')}
              </time>
              {/* TODO: Add reading time
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingTime} read</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
