import type { Locale } from '@/types/i18n'

export type Book = {
  slug: string
  title: string
  author: string
  /** Path of the cover under `public/`. */
  cover: string
  /** Language the book was read in (may differ from the cover's edition). */
  language: Locale
}
