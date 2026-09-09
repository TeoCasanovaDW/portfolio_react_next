import { defaultLocale, isLocale } from './locales'
import type { Locale } from '@/types/i18n'

/**
 * Ajoute le préfixe de locale à un chemin interne non préfixé.
 * L'anglais reste sans préfixe : `/about` en anglais, `/fr/about` en français.
 */
export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`

  if (locale === defaultLocale) return normalized

  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`
}

/**
 * Retire le préfixe de locale d'un `pathname` : `/fr/about` → `/about`, `/fr` → `/`.
 * Un chemin déjà sans préfixe est renvoyé tel quel.
 */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/')

  if (!isLocale(first)) return pathname === '' ? '/' : pathname

  const remaining = rest.join('/')

  return remaining ? `/${remaining}` : '/'
}
