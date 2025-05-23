import { PHProvider } from '@/components/posthog-provider'
import { ThemeProvider } from '@/components/providers'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Toaster } from '@/components/ui/sonner'
import { WebsiteForSaleToast } from '@/components/website-for-sale-toast'
import { WrappedClerkProvider } from '@/components/wrapped-clerk-provider'
import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { generatePageMeta } from '@/lib/seo'
import { StructuredData } from '@/lib/structured'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { locales } from '../../../i18n'

const PostHogPageView = dynamic(() => import('../../components/posthog-page-view'), {
  ssr: false,
})

interface LocaleRootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string | undefined
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export async function generateMetadata({
  params: { locale },
}: {
  params: LocaleRootLayoutProps['params']
}): Promise<Metadata> {
  unstable_setRequestLocale(locale || 'en')

  // const t = await getTranslations('site')

  return generatePageMeta({
    locale: locale,
    url: `${siteConfig.url}/${locale}`,
  })
}

export default function LocaleRootLayout({ children, params: { locale } }: LocaleRootLayoutProps) {
  const isValidLocale = locales.some((cur) => cur === locale)
  if (!isValidLocale) notFound()

  unstable_setRequestLocale(locale || 'en')

  return (
    <>
      <html lang={locale} suppressHydrationWarning>
        <head />
        <body className={cn('bg-background min-h-screen font-sans antialiased', fontSans.variable)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <WrappedClerkProvider>
              <StructuredData />
              <PHProvider>
                <div className="relative flex min-h-screen flex-col">
                  <PostHogPageView />
                  <SiteHeader />
                  <div className="flex-1">{children}</div>
                  <SiteFooter />
                  <WebsiteForSaleToast />
                </div>
                <TailwindIndicator />
              </PHProvider>
            </WrappedClerkProvider>
          </ThemeProvider>
          <Toaster closeButton />
        </body>
      </html>
    </>
  )
}
