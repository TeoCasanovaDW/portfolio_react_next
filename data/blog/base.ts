import type { ArticleBase } from '@/types/article'

/**
 * Article base, shared by both languages.
 * The order of this array does not matter: the list is sorted by descending date.
 */
export const articleBases = [
  {
    slug: 'login-redirect-ai-generated-code',
    date: '2026-09-23',
    readingMinutes: 6,
    tags: ['Next.js', 'Security', 'AI'],
  },
] as const satisfies readonly ArticleBase[]

/** Available slugs, derived from the base: an article without content breaks the build. */
export type ArticleSlug = (typeof articleBases)[number]['slug']
