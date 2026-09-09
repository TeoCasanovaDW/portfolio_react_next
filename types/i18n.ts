import type { en } from '@/data/i18n/en'

/** Langues supportées. L'anglais est la langue par défaut. */
export type Locale = 'en' | 'fr'

/**
 * Forme d'un dictionnaire, dérivée de l'anglais qui fait office de source de vérité :
 * une clé manquante ou en trop côté français casse le build.
 */
export type Dictionary = typeof en
