import type { Locale } from '@/types/i18n'

export const locales = ['en', 'fr'] as const satisfies readonly Locale[]

export const defaultLocale: Locale = 'en'

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale)
}

/**
 * Ramène une valeur d'origine externe (`params`, header `x-locale`) à une locale sûre.
 * Le proxy garantit déjà une locale valide : le repli anglais n'est qu'un filet de sécurité.
 */
export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale
}
