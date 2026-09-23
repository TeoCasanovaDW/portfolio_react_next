import type { ArticleBase } from '@/types/article'

/**
 * Base des articles, identique dans les deux langues.
 * L'ordre de ce tableau n'a pas d'importance : la liste est triée par date décroissante.
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

/** Slugs disponibles, dérivés de la base : un article sans contenu casse le build. */
export type ArticleSlug = (typeof articleBases)[number]['slug']
