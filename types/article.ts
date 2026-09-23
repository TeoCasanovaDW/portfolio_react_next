import type { ComponentType } from 'react'

/**
 * Untranslated part of an article: identity, date, duration and tags.
 * Shared by both languages.
 */
export type ArticleBase = {
  slug: string
  /** Publication date in ISO `YYYY-MM-DD` format: list sorting and `dateTime` attribute. */
  date: string
  /** Estimated reading time, in minutes. */
  readingMinutes: number
  /** Technical tags, identical in both languages: they also act as the filtering key. */
  tags: readonly string[]
}

/**
 * Translated part of an article.
 * `Body` is the component coming from the MDX file of the matching language.
 */
export type ArticleContent = {
  title: string
  /** Introduction sentence shown in the list. */
  excerpt: string
  Body: ComponentType
}

/** Article resolved in a locale, as consumed by the components. */
export type Article = {
  slug: string
  date: string
  readingMinutes: number
  tags: string[]
  title: string
  excerpt: string
  Body: ComponentType
}
