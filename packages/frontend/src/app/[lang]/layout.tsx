import 'server-only'

import Navbar from '@components/layout/navbar'
import { AnalyticsWrapper } from '@components/shared/analytics'
import { ToasterWrapper } from '@components/shared/ToasterWrapper'
import { Database } from '@lib/database.types'
import profilePic from '@public/profilePic.jpg'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Metadata } from 'next'
import Footer from '../../components/layout/Footer'
import '../globals.css'

export const revalidate = 60

export type TypedSupabaseClient = SupabaseClient<Database>

export const metadata: Metadata = {
  title: {
    default: 'Cryptoneur',
    template: 'Cryptoneur | %s',
  },
  description:
    'Welcome to my personal website! Check out my portofolio projects, browse through my blog posts or get in touch with me for freelance work.',
  keywords:
    'crypto, web3, freelancer, developer, react, nextjs, tailwind, typescript, ethereum, solidity, web3, blockchain, dapp, defi, decentralised, data, machine learning, gpt3',
  openGraph: {
    title: 'Cryptoneur',
    description:
      'Welcome to my personal website! Check out my portofolio projects, browse through my blog posts or get in touch with me for freelance work.',
    url: 'https://www.cryptoneur.xyz',
    siteName: 'Cryptoneur.xyz',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}${profilePic.src}`,
        width: profilePic.width,
        height: profilePic.height,
        alt: 'Cryptoneur.xyz profile picture',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cryptoneur',
    description:
      'Welcome to my personal website! Check out my portofolio projects, browse through my blog posts or get in touch with me for freelance work.',
    creator: '@cryptoneur_eth',
    creatorId: '1229504037495746560',
    images: [
      {
        url: profilePic.src,
        width: profilePic.width,
        height: profilePic.height,
      },
    ],
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-base-200">
        <ToasterWrapper />
        <Navbar />
        {children}
        <AnalyticsWrapper />
        <Footer />
      </body>
    </html>
  )
}
