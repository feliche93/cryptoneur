import 'server-only'

import { AnalyticsWrapper } from '@components/shared/analytics'
import SupabaseProvider from '@components/supabase-provider'
import { Database } from '@lib/database.types'
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { createServerClient } from '@utils/supabase-server'
import { NextSeo } from 'next-seo'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import './globals.css'
import { QueryClientWrapper } from '@components/query-client-wrapper'

export type TypedSupabaseClient = SupabaseClient<Database>

export const revalidate = 0

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <head>
        {/* Used to be added by default, now we need to add manually */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <NextSeo
        useAppDir={true}
        // facebook={{ appId: '1234567890' }}
        // themeColor="#73fa97"
        titleTemplate="Cryptoneur | %s"
      />
      <SupabaseProvider session={session}>
        <QueryClientWrapper>
          <body className="bg-base-200">
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
