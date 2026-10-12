import type { Locale } from '@/types/i18n'

/**
 * The project displayed on the home page ("Working on").
 * It has no link on purpose: the repository is private.
 */
export const workingOn: { name: Record<Locale, string>; description: Record<Locale, string> } = {
  name: {
    en: 'Workout tracking app',
    fr: 'Application de suivi musculation',
  },
  description: {
    en: 'An app to build my workouts and follow them, with my performance, consistency, body measurements and other stats.',
    fr: 'Une application pour créer mes entraînements et les suivre, avec mes performances, mon assiduité, mes mensurations et d’autres statistiques.',
  },
}
