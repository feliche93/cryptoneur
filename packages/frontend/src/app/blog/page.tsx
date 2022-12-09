import BlogPostGrid from '@components/blog/BlogPostGrid'
import { Header } from '@components/blog/Header'

export default function Home() {
  return (
    <div className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-10 lg:pb-28">
      <Header />
      <BlogPostGrid />
    </div>
  )
}
