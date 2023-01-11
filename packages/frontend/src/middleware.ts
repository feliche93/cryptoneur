import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// this middleware refreshes the user's session and must be run
// for any Server Component route that uses `createServerComponentSupabaseClient`
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareSupabaseClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log({ session })
  console.log({ pathname: req.nextUrl.pathname })

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

  // if (!session && req.nextUrl.pathname.startsWith('/web3-grants')) {
  //   console.log('redirecting to sign-in')
  //   // Auth condition not met, redirect to home page.
  //   const redirectUrl = req.nextUrl.clone()
  //   redirectUrl.pathname = '/sign-in'
  //   redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  //   return NextResponse.redirect(redirectUrl)
  // }

  return res
}

export const config = {
  matcher: ['/sign-in', '/register'],
}
