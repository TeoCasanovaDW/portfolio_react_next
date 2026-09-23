import type { ComponentType } from 'react'

/**
 * Partie non traduite d'un article : identité, date, durée et tags.
 * Partagée par les deux langues.
 */
export type ArticleBase = {
  slug: string
  /** Date de publication au format ISO `AAAA-MM-JJ` : tri de la liste et attribut `dateTime`. */
  date: string
  /** Durée de lecture estimée, en minutes. */
  readingMinutes: number
  /** Tags techniques, identiques dans les deux langues : ils servent aussi de clé de filtrage. */
  tags: readonly string[]
}

/**
 * Partie traduite d'un article.
 * `Body` est le composant issu du fichier MDX de la langue correspondante.
 */
export type ArticleContent = {
  title: string
  /** Phrase d'introduction affichée dans la liste. */
  excerpt: string
  Body: ComponentType
}

/** Article résolu dans une locale, tel que consommé par les composants. */
export type Article = {
  slug: string
  date: string
  readingMinutes: number
  tags: string[]
  title: string
  excerpt: string
  Body: ComponentType
}
