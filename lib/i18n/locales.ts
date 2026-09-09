import type { Locale } from '@/types/i18n'

export const locales = ['en', 'fr'] as const satisfies readonly Locale[]

export const defaultLocale: Locale = 'en'

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale)
}
