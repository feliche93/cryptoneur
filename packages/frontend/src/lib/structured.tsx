// core/structured.tsx

import { siteConfig } from '@/config/site'
import Script from 'next/script'
import type React from 'react'
import type {
  Article,
  BreadcrumbList,
  Graph,
  Organization,
  Person,
  WebSite,
  WithContext,
} from 'schema-dts'

// Define a TypeScript type for the component's props
interface NewsArticleProps {
  id: string
  headline: string
  datePublished: string
  dateModified: string
  commentCount?: number
  imageUrl: string
  articleSection: string[]
  keywords: string[]
}

// Define the component
export const NewsArticleStructuredData: React.FC<NewsArticleProps> = ({
  id,
  headline,
  datePublished,
  dateModified,
  commentCount,
  imageUrl,
  articleSection,
  keywords,
}) => {
  // Ensure datePublished and dateModified are in ISO 8601 format with timezone
  const isoDatePublished = new Date(datePublished).toISOString()
  const isoDateModified = new Date(dateModified).toISOString()

  // Define the structured data
  const structuredData: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': id,
    headline: headline,
    datePublished: isoDatePublished,
    dateModified: isoDateModified,
    author: authorData,
    commentCount: commentCount,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: '1200',
      height: '630',
    },
    articleSection: articleSection,
    keywords: keywords.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/${id}`,
    },
    publisher: authorData,
    thumbnailUrl: imageUrl,
    inLanguage: 'en-US',
  }

  // Return the structured data inside a script tag
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  )
}

const organizationData: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FV Ventures UG',
  url: siteConfig.url,
  logo: siteConfig.ogImage,
}

const authorData: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Felix Vemmer',
  url: siteConfig.url,
  image: siteConfig.logo,
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.twitter],
  jobTitle: 'Full-Stack Developer & Indiepreneur',
  worksFor: organizationData,
}

const websiteData: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  publisher: authorData,
}

// Define the StructuredData component
export const StructuredData: React.FC = () => {
  const graph: Graph = {
    '@context': 'https://schema.org',
    '@graph': [organizationData, websiteData, authorData],
  }
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph, null, 2) }}
    />
  )
}

export const BreadCrumbStructuredData = ({
  itemListElement,
}: {
  itemListElement: { name: string; href?: string }[]
}) => {
  const structuredData: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: itemListElement.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.href,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  )
}
