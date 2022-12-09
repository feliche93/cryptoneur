import React from 'react'
import { BlogPostCard } from './BlogPostCard'

type Props = {}

export default function BlogPostGrid({}: Props) {
  return (
    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      {/* {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))} */}
    </div>
  )
}
