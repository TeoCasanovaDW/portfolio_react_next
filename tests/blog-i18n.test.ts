import { describe, expect, it } from 'vitest'
import { locales } from '@/lib/i18n'
import { articleSlugs, formatArticleDate, getAllTags, getArticle, getArticles } from '@/lib/blog'
import { articleBases, enArticles, frArticles } from '@/data/blog'
import type { Article, ArticleContent } from '@/types/article'

const contentsByLocale = { en: enArticles, fr: frArticles } as const

const localeArticlePairs = locales.flatMap((locale) =>
  articleBases.map((base) => [locale, base.slug] as const)
)

describe('article content integrity', () => {
  it.each(localeArticlePairs)('%s / %s resolves a non-empty title and excerpt', (locale, slug) => {
    const content: ArticleContent = contentsByLocale[locale][slug]

    expect(content.title.trim()).not.toBe('')
    expect(content.excerpt.trim()).not.toBe('')
    expect(typeof content.Body).toBe('function')
  })

  it.each(localeArticlePairs)(
    '%s / %s resolves the same untranslated data as the base',
    (locale, slug) => {
      const base = articleBases.find((article) => article.slug === slug)!
      const article = getArticle(slug, locale)!

      expect(article.date).toBe(base.date)
      expect(article.readingMinutes).toBe(base.readingMinutes)
      expect(article.tags).toEqual([...base.tags])
    }
  )
})

describe('article catalogue', () => {
  it('exposes the same articles in the same order in both languages', () => {
    for (const locale of locales) {
      expect(getArticles(locale).map((article) => article.slug)).toEqual(articleSlugs)
    }
    expect(articleSlugs[0]).toBe('next-server-components')
  })

  it('sorts articles by descending date', () => {
    const dates = getArticles('en').map((article) => article.date)

    expect(dates).toEqual([...dates].sort().reverse())
  })

  it('keeps untranslated data identical across languages', () => {
    const untranslatedFields = ({ slug, date, readingMinutes, tags }: Article) => ({
      slug,
      date,
      readingMinutes,
      tags,
    })

    expect(getArticles('fr').map(untranslatedFields)).toEqual(
      getArticles('en').map(untranslatedFields)
    )
  })

  it('returns undefined for an unknown slug in both languages', () => {
    for (const locale of locales) {
      expect(getArticle('inexistant', locale)).toBeUndefined()
    }
  })
})

describe('tag filtering', () => {
  it('narrows the list to articles carrying the tag, case-insensitively', () => {
    expect(getArticles('en', 'React').map((article) => article.slug)).toEqual([
      'next-server-components',
    ])
    expect(getArticles('en', 'REACT').map((article) => article.slug)).toEqual([
      'next-server-components',
    ])
  })

  it('returns every article when the tag is common to all of them', () => {
    expect(getArticles('en', 'Architecture').map((article) => article.slug)).toEqual(articleSlugs)
  })

  it('returns an empty list for an unknown tag', () => {
    expect(getArticles('en', 'unknown-tag')).toEqual([])
  })

  it('returns every article when no tag is given', () => {
    expect(getArticles('fr')).toHaveLength(articleSlugs.length)
  })

  it('exposes every tag once, deduplicated and sorted alphabetically', () => {
    const expected = [...new Set(articleBases.flatMap((base) => base.tags))].sort((a, b) =>
      a.localeCompare(b)
    )

    expect(getAllTags()).toEqual(expected)
  })
})

describe('date formatting', () => {
  it('formats the same date differently in each language', () => {
    expect(formatArticleDate('2026-09-23', 'en')).toBe('September 23, 2026')
    expect(formatArticleDate('2026-09-23', 'fr')).toBe('23 septembre 2026')
  })
})
