import { formatDate } from '@/lib/utils'
import { Post, allAuthors } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'
import { FC, Suspense } from 'react'
import { Badge } from './ui/badge'
import { FadeIn } from './ui/fade-in'
import { PageViews } from './page-views'

export interface BlogPostGridProps {
  posts: Post[] // replace with your actual Post type
}

export const BlogPostGrid: FC<BlogPostGridProps> = ({ posts }) => {
  return (
    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {posts.map((post) => {
        const authors = post.authors.map((author) =>
          allAuthors.find(({ slug }) => slug === `/authors/${author}`),
        )

        return (
          <div key={post._id}>
            <article className="flex flex-col items-start justify-between">
              <Link href={post.slug}>
                <div className="relative w-full">
                  <Image
                    className="aspect-[16/9] w-full rounded-2xl bg-base-200 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    src={post.image}
                    alt={post.title}
                    width={804}
                    height={452}
                  />

                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                </div>
              </Link>
              {/* TODO: Add featured */}
              <div className="max-w-xl">
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  {post.date && (
                    <time dateTime={post.date} className="text-xs text-muted-foreground">
                      {formatDate(post.date)}
                    </time>
                  )}
                  {post.categories &&
                    post.categories
                      .map((category, index) => <Badge key={index}>{category}</Badge>)
                      .slice(0, 2)}
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-base-content group-hover:text-primary">
                    <Link href={post.slug}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-base-content/80">
                    {post.description}
                  </p>
                </div>
                <div className='flex flex-row items-center justify-between'>
                  {/* Author */}
                  <div className="relative mt-4 flex items-center gap-x-4">
                    {authors[0]?.avatar && (
                      <Image
                        className="h-10 w-10 rounded-full bg-base-200"
                        src={authors[0].avatar}
                        alt={authors[0].title}
                        width={40}
                        height={40}
                      />
                    )}

                    <div className="text-sm leading-6">
                      <p className="text-base-conten/80 font-semibold">
                        <Link href={'#'}>
                          <span className="absolute inset-0" />
                          {authors[0]?.title}
                        </Link>
                      </p>
                      {/* <p>{authors[0]?.twitter}</p> */}
                    </div>
                  </div>
                  {/* Page Views */}
                  <Suspense fallback={null}>
                    <PageViews className='mt-3 mr-2' slug={post.slug} />
                  </Suspense>
                </div>
              </div>
            </article>
          </div>
        )
      })}
    </div>
  )
}
