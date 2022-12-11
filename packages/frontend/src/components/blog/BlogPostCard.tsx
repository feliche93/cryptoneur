import Image from 'next/image'
import { FC } from 'react'
import dayjs from 'dayjs'

export interface BlogPostCardProps {
  post: any
  id: string
}
export const BlogPostCard: FC<BlogPostCardProps> = ({ post, id }) => {
  console.log(post)

  return (
    <div key={post?.title} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <Image
          className="h-full w-full object-cover"
          src={post?.cover?.data?.attributes?.url}
          width={post?.cover?.data?.attributes?.width}
          height={post?.cover?.data?.attributes?.height}
          alt={post?.cover?.data?.attributes?.alternativeText}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-base-200 p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-600">
            {post?.tags?.data.map((tag) => {
              return (
                <a
                  key={tag?.id}
                  href={`/blog/tag/${tag?.attributes?.name.toLowerCase()}`}
                  className="hover:underline"
                >
                  {tag?.attributes?.name}
                </a>
              )
            })}
          </p>
          <a href={post?.slug} className="mt-2 block">
            <p className="font-semibol text-xl">{post.title}</p>
            <p className="mt-3 text-base text-base-content/80">{post.description}</p>
          </a>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <a href={post?.authors?.data[0]?.attributes?.name}>
              <span className="sr-only">{post?.authors?.data[0]?.attributes?.name}</span>
              <Image
                width={50}
                height={50}
                className="rounded-full object-contain"
                src={post.authors.data[0].attributes?.avatar?.data?.attributes?.url}
                alt={post?.authors?.data[0]?.attributes?.name}
              />
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">
              <a href={post?.authors?.data[0]?.attributes?.name} className="hover:underline">
                {post?.authors?.data[0]?.attributes?.name}
              </a>
            </p>
            <div className="flex space-x-1 text-sm text-base-content/80">
              <time dateTime={post?.createdAt}>{post?.createdAt}</time>
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
