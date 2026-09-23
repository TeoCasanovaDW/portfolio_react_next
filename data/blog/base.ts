import type { ArticleBase } from '@/types/article'

/**
 * Article base, shared by both languages.
 * The order of this array does not matter: the list is sorted by descending date.
 */
export const articleBases = [
  {
    slug: 'next-server-components',
    date: '2026-09-23',
    readingMinutes: 7,
    tags: ['Next.js', 'React', 'Architecture'],
  },
  {
    slug: 'typescript-strict-mode',
    date: '2026-08-12',
    readingMinutes: 5,
    tags: ['TypeScript', 'Architecture'],
  },
] as const satisfies readonly ArticleBase[]

/** Available slugs, derived from the base: an article without content breaks the build. */
export type ArticleSlug = (typeof articleBases)[number]['slug']
