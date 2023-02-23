import 'server-only'

import { QueryClientWrapper } from '@components/query-client-wrapper'
import { AnalyticsWrapper } from '@components/shared/analytics'
import { ToasterWrapper } from '@components/shared/ToasterWrapper'
import SupabaseProvider from '@components/supabase-provider'
import { Database } from '@lib/database.types'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { createServerClient } from '@utils/supabase-server'
import { NextSeo } from 'next-seo'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import './globals.css'
import { Metadata } from 'next'
import profilePic from '@public/profilePic.jpg'

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
        url: profilePic.src,
        width: profilePic.width,
        height: profilePic.height,
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
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <SupabaseProvider session={session}>
        <QueryClientWrapper>
          <body className="min-h-screen bg-base-200">
            <ToasterWrapper />
            <Navbar />
            {children}
            <AnalyticsWrapper />
            <Footer />
          </body>
        </QueryClientWrapper>
      </SupabaseProvider>
    </html>
  )
}
