import { NextResponse, type NextRequest } from 'next/server'
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  defaultLocale,
  isLocale,
  localizePath,
  stripLocale,
} from '@/lib/i18n'
import type { Locale } from '@/types/i18n'

/** Passes the resolved locale to Server Components that do not receive `params`. */
function withLocaleHeader(request: NextRequest, locale: Locale) {
  const headers = new Headers(request.headers)
  headers.set('x-locale', locale)

  return { request: { headers } }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const prefix = pathname.split('/')[1]

  // 1. `/en...` is an explicit choice: strip the prefix and set the cookie again.
  if (prefix === defaultLocale) {
    const url = request.nextUrl.clone()
    url.pathname = stripLocale(pathname)

    const response = NextResponse.redirect(url, 307)
    response.cookies.set(LOCALE_COOKIE, defaultLocale, {
      path: '/',
      maxAge: LOCALE_COOKIE_MAX_AGE,
      sameSite: 'lax',
    })

    return response
  }

  // 2. `/fr...` passes through untouched.
  if (isLocale(prefix)) {
    return NextResponse.next(withLocaleHeader(request, prefix))
  }

  // 3. Unprefixed path with a stored French preference.
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  if (isLocale(cookieLocale) && cookieLocale !== defaultLocale) {
    const url = request.nextUrl.clone()
    url.pathname = localizePath(pathname, cookieLocale)

    return NextResponse.redirect(url, 307)
  }

  // 4. Default: English, rewritten internally, URL unchanged.
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`

  return NextResponse.rewrite(url, withLocaleHeader(request, defaultLocale))
}

// Excludes `/api`, `_next` and any path containing a dot (static files).
export const config = {
  matcher: ['/((?!api|_next)[^.]*)'],
}
