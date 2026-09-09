import { en } from '@/data/i18n/en'
import { fr } from '@/data/i18n/fr'
import type { Dictionary, Locale } from '@/types/i18n'

const dictionaries: Record<Locale, Dictionary> = { en, fr }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
