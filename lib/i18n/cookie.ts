/**
 * Cookie de persistance de la langue, partagé par `proxy.ts` qui le lit
 * et par le sélecteur de langue qui l'écrit avant de naviguer.
 */
export const LOCALE_COOKIE = 'NEXT_LOCALE'

/** Un an, conformément au §1 de la spec. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
