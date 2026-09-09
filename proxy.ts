import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isLocale, localizePath, stripLocale } from '@/lib/i18n'
import type { Locale } from '@/types/i18n'

const LOCALE_COOKIE = 'NEXT_LOCALE'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

/** Transmet la locale résolue aux Server Components qui ne reçoivent pas `params`. */
function withLocaleHeader(request: NextRequest, locale: Locale) {
  const headers = new Headers(request.headers)
  headers.set('x-locale', locale)

  return { request: { headers } }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const prefix = pathname.split('/')[1]

  // 1. `/en...` est un choix explicite : on retire le préfixe et on repose le cookie.
  if (prefix === defaultLocale) {
    const url = request.nextUrl.clone()
    url.pathname = stripLocale(pathname)

    const response = NextResponse.redirect(url, 307)
    response.cookies.set(LOCALE_COOKIE, defaultLocale, {
      path: '/',
      maxAge: COOKIE_MAX_AGE,
      sameSite: 'lax',
    })

    return response
  }

  // 2. `/fr...` passe tel quel.
  if (isLocale(prefix)) {
    return NextResponse.next(withLocaleHeader(request, prefix))
  }

  // 3. Chemin non préfixé avec une préférence française enregistrée.
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  if (isLocale(cookieLocale) && cookieLocale !== defaultLocale) {
    const url = request.nextUrl.clone()
    url.pathname = localizePath(pathname, cookieLocale)

    return NextResponse.redirect(url, 307)
  }

  // 4. Par défaut : anglais, réécrit en interne, URL inchangée.
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`

  return NextResponse.rewrite(url, withLocaleHeader(request, defaultLocale))
}

// Exclut `/api`, `_next` et tout chemin contenant un point (fichiers statiques).
export const config = {
  matcher: ['/((?!api|_next)[^.]*)'],
}
