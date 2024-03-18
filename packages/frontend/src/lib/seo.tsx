import { siteConfig } from '@/config/site'
import { type Metadata } from 'next'
import { type OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import { type Twitter } from 'next/dist/lib/metadata/types/twitter-types'
import { type StaticImageData } from 'next/image'

const title = 'Freelance Full-Stack Developer and Indiepreneur based in Berlin'
const description = `Explore my insights on full-stack development and discover the freelance services I offer, directly from Berlin.`

export const rootOpenGraph: OpenGraph = {
  locale: 'en',
  type: 'website',
  url: siteConfig.url,
  siteName: 'Felix Vemmer',
  title,
  description,
}

export const rootTwitter: Twitter = {
  title,
  description,
  card: 'summary_large_image',
  site: '@felixvemmer',
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description,
  applicationName: 'Felix Vemmer',
  openGraph: rootOpenGraph,
  twitter: rootTwitter,
  robots: 'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
}

function getImage(image?: StaticImageData | string, alt?: string) {
  if (!image) {
    return null
  }

  if (typeof image === 'string') {
    return {
      url: image,
      alt,
    }
  }

  return {
    url: image.src,
    width: image.width,
    height: image.height,
    alt,
  }
}

export function generatePageMeta({
  locale = 'en',
  title = rootOpenGraph.title as string,
  description = rootOpenGraph.description as string,
  url,
  image,
  image_alt,
  publishedAt,
  updatedAt,
  author = 'Felix Vemmer',
  siteName = rootOpenGraph.siteName,
  feed,
  keywords = [
    'Felix Vemmer',
    'Freelance Software Engineer',
    'Full-stack developer',
    'Python',
    'TypeScript',
    'Next.js',
    'React',
    'Indiepreneur',
    'Tech Stack',
  ],
}: {
  locale?: string
  title?: string
  description?: string
  url?: string
  image?: StaticImageData | string
  image_alt?: string
  publishedAt?: string
  updatedAt?: string
  author?: string
  siteName?: string
  feed?: string
  keywords?: string[]
} = {}): Metadata {
  const metadata = {
    ...rootMetadata,
    title,
    description,
    keywords,
    publisher: siteName,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...rootOpenGraph,
      locale,
      url,
      title: title ?? siteName ?? rootOpenGraph.siteName,
      description,
    } as OpenGraph,
    twitter: {
      ...rootTwitter,
      title: title ?? siteName ?? rootOpenGraph.siteName,
      description,
    } as Twitter,
  } as Metadata

  if (publishedAt && author) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: updatedAt ?? publishedAt,
      authors: [author],
      section: siteName,
      tags: keywords.join(', '),
    }
    metadata.creator = author
  }

  const img = getImage(image, image_alt || title)
  const screenshot = {
    url: `/social.jpg`,
    width: 1200,
    height: 630,
    alt: title,
    type: 'image/jpeg',
  }
  metadata.openGraph!.images = img ? [img] : [screenshot]
  metadata.twitter!.images = img ? [img] : [screenshot]

  if (siteName) {
    metadata.applicationName = siteName
    metadata.openGraph!.siteName = siteName
  }

  if (feed) {
    if (!metadata.alternates!.types) {
      metadata.alternates!.types = {}
    }
    metadata.alternates!.types['application/rss+xml'] = feed
  }

  return metadata
}
