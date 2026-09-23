import type { Locale } from '@/types/i18n'

export const locales = ['en', 'fr'] as const satisfies readonly Locale[]

export const defaultLocale: Locale = 'en'

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale)
}

/**
 * Narrows a value coming from outside (`params`, the `x-locale` header) to a safe locale.
 * The proxy already guarantees a valid locale: the English fallback is only a safety net.
 */
export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale
}
