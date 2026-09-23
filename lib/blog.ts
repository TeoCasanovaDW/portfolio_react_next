import { articleBases, enArticles, frArticles } from '@/data/blog'
import type { Article, ArticleBase, ArticleContent } from '@/types/article'
import type { Locale } from '@/types/i18n'

const contents: Record<Locale, Record<string, ArticleContent>> = {
  en: enArticles,
  fr: frArticles,
}

/** Fusionne la base et le contenu traduit en un `Article` complet. */
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
 * Du plus récent au plus ancien. Les dates ISO se comparent comme des chaînes.
 * `sort` étant stable, deux articles de même date gardent l'ordre de la base.
 */
function byDateDesc(a: ArticleBase, b: ArticleBase): number {
  return b.date.localeCompare(a.date)
}

/** Vrai si l'article porte ce tag. La comparaison ignore la casse : le tag vient de l'URL. */
function hasTag(base: ArticleBase, tag: string): boolean {
  return base.tags.some((value) => value.toLowerCase() === tag.toLowerCase())
}

/**
 * Articles résolus dans une locale, du plus récent au plus ancien.
 * Un `tag` restreint la liste ; un tag inconnu renvoie un tableau vide.
 */
export function getArticles(locale: Locale, tag?: string): Article[] {
  const content = contents[locale]

  return articleBases
    .filter((base) => !tag || hasTag(base, tag))
    .sort(byDateDesc)
    .map((base) => resolveArticle(base, content[base.slug]))
}

/** Article résolu dans une locale, ou `undefined` si le slug est inconnu. */
export function getArticle(slug: string, locale: Locale): Article | undefined {
  const base = articleBases.find((article) => article.slug === slug)

  if (!base) return undefined

  return resolveArticle(base, contents[locale][base.slug])
}

/**
 * Tags présents dans au moins un article, dédupliqués sans tenir compte de la casse
 * et classés par ordre alphabétique. La première orthographe rencontrée fait foi.
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

/** Slugs des articles, du plus récent au plus ancien. Identiques dans les deux langues. */
export const articleSlugs: string[] = [...articleBases].sort(byDateDesc).map((base) => base.slug)
