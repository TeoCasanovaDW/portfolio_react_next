import type { en } from '@/data/i18n/en'

/** Supported languages. English is the default language. */
export type Locale = 'en' | 'fr'

/**
 * Shape of a dictionary, derived from English which acts as the source of truth:
 * a missing or extra key on the French side breaks the build.
 */
export type Dictionary = typeof en
