/**
 * v0 by Vercel.
 * @see https://v0.dev/t/SvZjaEpu0ds
 */
import { Card } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { allPosts } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'

interface RelatedPostCardProps {
  slug: string
}

export function RelatedPostCard({ slug }: RelatedPostCardProps) {
  const post = allPosts.find((p) => p.slug === slug)

  if (!post) {
    throw new Error(`Cannot find post with slug "${slug}"`)
  }

  return (
    <Link target="_blank" href={post.slug}>
      <Card className="flex my-4 flex-wrap md:flex-nowrap mx-auto shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2">
          <Image
            alt="blog cover"
            className="w-full h-full object-cover object-center"
            height="200"
            src={post.image}
            style={{
              aspectRatio: '300/200',
              objectFit: 'cover',
            }}
            width="300"
          />
        </div>
        <div className="w-full md:w-1/2 py-5 px-6 dark:text-gray-300">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="mt-2 text-muted-foreground line-clamp-3">{post.description}</p>
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="font-light text-sm">{formatDate(post.date)}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
