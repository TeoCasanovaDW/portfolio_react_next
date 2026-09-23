/**
 * Language persistence cookie, shared by `proxy.ts` which reads it
 * and by the language switcher which writes it before navigating.
 */
export const LOCALE_COOKIE = 'NEXT_LOCALE'

/** One year, as required by §1 of the spec. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365
