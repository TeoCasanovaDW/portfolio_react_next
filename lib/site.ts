import type { Metadata } from 'next'
import { defaultLocale, locales, localizePath } from '@/lib/i18n'
import type { Locale } from '@/types/i18n'

/** Repli de développement : en production, `NEXT_PUBLIC_SITE_URL` est renseignée sur Vercel. */
const FALLBACK_SITE_URL = 'http://localhost:3000'

/** Origine publique du site, sans slash final, base de toutes les URLs absolues. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/+$/, '')

/**
 * URL absolue d'un chemin interne dans une locale.
 * L'anglais reste sans préfixe : aucune URL `/en/...` n'est jamais produite.
 */
export function absoluteUrl(path: string, locale: Locale): string {
  return `${SITE_URL}${localizePath(path, locale)}`
}

/**
 * `canonical` de la locale courante et `hreflang` des deux langues,
 * l'anglais servant aussi de `x-default`.
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
