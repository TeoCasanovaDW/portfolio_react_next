import { articleBases, enArticles, frArticles } from '@/data/blog'
import type { Article, ArticleBase, ArticleContent } from '@/types/article'
import type { Locale } from '@/types/i18n'

const contents: Record<Locale, Record<string, ArticleContent>> = {
  en: enArticles,
  fr: frArticles,
}

/** Merges the base and the translated content into a complete `Article`. */
function resolveArticle(base: ArticleBase, content: ArticleContent): Article {
  return {
    slug: base.slug,
    date: base.date,
    readingMinutes: base.readingMinutes,
    tags: [...base.tags],
    title: content.title,
    excerpt: content.excerpt,
    Body: content.Body,
  }
}

/**
 * Newest first. ISO dates compare correctly as plain strings.
 * Since `sort` is stable, two articles sharing a date keep the order of the base.
 */
function byDateDesc(a: ArticleBase, b: ArticleBase): number {
  return b.date.localeCompare(a.date)
}

/** True if the article carries this tag. Case-insensitive: the tag comes from the URL. */
function hasTag(base: ArticleBase, tag: string): boolean {
  return base.tags.some((value) => value.toLowerCase() === tag.toLowerCase())
}

/**
 * Articles resolved in a locale, newest first.
 * A `tag` narrows the list; an unknown tag returns an empty array.
 */
export function getArticles(locale: Locale, tag?: string): Article[] {
  const content = contents[locale]

  return articleBases
    .filter((base) => !tag || hasTag(base, tag))
    .sort(byDateDesc)
    .map((base) => resolveArticle(base, content[base.slug]))
}

/** Article resolved in a locale, or `undefined` if the slug is unknown. */
export function getArticle(slug: string, locale: Locale): Article | undefined {
  const base = articleBases.find((article) => article.slug === slug)

  if (!base) return undefined

  return resolveArticle(base, contents[locale][base.slug])
}

/**
 * Tags used by at least one article, deduplicated regardless of case
 * and sorted alphabetically. The first spelling encountered wins.
 */
export function getAllTags(): string[] {
  const tags = new Map<string, string>()

  for (const base of articleBases) {
    for (const tag of base.tags) {
      const key = tag.toLowerCase()

      if (!tags.has(key)) tags.set(key, tag)
    }
  }

  return [...tags.values()].sort((a, b) => a.localeCompare(b))
}

/** Article slugs, newest first. Identical in both languages. */
export const articleSlugs: string[] = [...articleBases].sort(byDateDesc).map((base) => base.slug)

/**
 * Publication date in long, localized form (e.g. "September 23, 2026").
 * `timeZone: 'UTC'` keeps the result stable regardless of the build machine's local time,
 * since `date` is a plain ISO day with no time component.
 */
export function formatArticleDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(date)
  )
}
