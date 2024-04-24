import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'
import { locales } from '../i18n'
import { localePrefix, pathnames } from './app/navigation'

const intlMiddleware = createMiddleware({
  locales,
  pathnames,
  localePrefix,
  defaultLocale: 'en',
})

const isProtectedRoute = createRouteMatcher([])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()

  return intlMiddleware(req)
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|ingest).*)', '/', '/(api|trpc)(.*)'],
}
