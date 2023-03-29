import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18n } from '../i18n-config'

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  console.log('Negotiator languages:', languages) // Debugging line

  const locales: string[] = i18n.locales.slice()
  console.log('Available locales:', locales) // Debugging line

  try {
    return matchLocale(languages, locales, i18n.defaultLocale)
  } catch (error) {
    console.error('Error matching locale:', error) // Debugging line
    return i18n.defaultLocale
  }
}

// this middleware refreshes the user's session and must be run
// for any Server Component route that uses `createServerComponentSupabaseClient`
export async function middleware(req: NextRequest) {

  const res = NextResponse.next()
  const supabase = createMiddlewareSupabaseClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Skip next internal and image requests
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    /\.(.*)$/.test(req.nextUrl.pathname)
  ) {
    return
  }

  const pathname = req.nextUrl.pathname

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Let's redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(req)

    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, req.url))
  }


  if (session && req.nextUrl.pathname.startsWith('/sign-in')) {

    // Auth condition not met, redirect to home page.
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/'
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (session && req.nextUrl.pathname.startsWith('/register')) {
    // Auth condition not met, redirect to home page.
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/'
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    '/sign-in',
    '/register',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

