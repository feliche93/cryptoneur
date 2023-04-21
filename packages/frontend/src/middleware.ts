import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18n } from '../i18n-config'

export const runtime = 'nodejs'; // 'nodejs' (default) | 'experimental-edge'

function getLocale(request: NextRequest, pageLanguages: string[]): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  // Filter out wildcard value
  languages = languages.filter((language) => language !== '*')
  console.log('Negotiator languages:', languages)

  const locales: string[] = i18n.locales.slice()
  console.log('Available locales:', locales)

  // Filter the supported locales based on the available languages for the page
  const supportedLocales = locales.filter((locale) => pageLanguages.includes(locale))
  console.log('Supported locales for the page:', supportedLocales)

  try {
    return matchLocale(languages, supportedLocales, i18n.defaultLocale)
  } catch (error) {
    console.error('Error matching locale:', error)
    return i18n.defaultLocale
  }
}

// this middleware refreshes the user's session and must be run
// for any Server Component route that uses `createServerComponentSupabaseClient`
export async function middleware(req: NextRequest) {

  const res = NextResponse.next()

  console.log('req.nextUrl.pathname', req.nextUrl.pathname)

  // Skip next internal and image requests
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    req.nextUrl.pathname.includes('/_next/image') ||
    req.nextUrl.pathname.startsWith('/api') ||
    req.nextUrl.pathname.startsWith('/.ico') ||
    req.nextUrl.pathname.startsWith('/_vercel') ||
    req.nextUrl.pathname.startsWith('/_next') ||
    /\.(.*)$/.test(req.nextUrl.pathname)
  ) {
    return res
  }

  const pathname = req.nextUrl.pathname

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Let's redirect if there is no locale
  if (pathnameIsMissingLocale) {

    let pageLanguages = ['en']

    if (pathname.includes('/gas-fees-calculator')) {
      pageLanguages = ['en', 'zh']
    }

    const locale = getLocale(req, pageLanguages)

    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

