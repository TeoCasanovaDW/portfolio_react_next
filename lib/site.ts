import type { Metadata } from 'next'
import { defaultLocale, locales, localizePath } from '@/lib/i18n'
import type { Locale } from '@/types/i18n'

/** Development fallback: in production, `NEXT_PUBLIC_SITE_URL` is set on Vercel. */
const FALLBACK_SITE_URL = 'http://localhost:3000'

/** Public origin of the site, without a trailing slash, base of every absolute URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/+$/, '')

/**
 * Absolute URL of an internal path in a locale.
 * English stays unprefixed: no `/en/...` URL is ever produced.
 */
export function absoluteUrl(path: string, locale: Locale): string {
  return `${SITE_URL}${localizePath(path, locale)}`
}

/**
 * `canonical` for the current locale and `hreflang` for both languages,
 * with English also serving as `x-default`.
 */
export function localeAlternates(path: string, locale: Locale): Metadata['alternates'] {
  return {
    canonical: absoluteUrl(path, locale),
    languages: {
      ...Object.fromEntries(locales.map((code) => [code, absoluteUrl(path, code)])),
      'x-default': absoluteUrl(path, defaultLocale),
    },
  }
}
