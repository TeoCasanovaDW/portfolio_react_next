import { defaultLocale, isLocale } from './locales'
import type { Locale } from '@/types/i18n'

/**
 * Adds the locale prefix to an unprefixed internal path.
 * English stays unprefixed: `/about` in English, `/fr/about` in French.
 */
export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`

  if (locale === defaultLocale) return normalized

  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`
}

/**
 * Strips the locale prefix from a `pathname`: `/fr/about` → `/about`, `/fr` → `/`.
 * An already unprefixed path is returned as is.
 */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/')

  if (!isLocale(first)) return pathname === '' ? '/' : pathname

  const remaining = rest.join('/')

  return remaining ? `/${remaining}` : '/'
}
