import NextServerComponents from '@/content/blog/fr/next-server-components.mdx'
import TypeScriptStrictMode from '@/content/blog/fr/typescript-strict-mode.mdx'
import type { ArticleSlug } from './base'
import type { ArticleContent } from '@/types/article'

/**
 * Contenus des articles en français.
 * Chaque entrée associe son titre, sa phrase d'introduction et son corps MDX.
 */
export const frArticles: Record<ArticleSlug, ArticleContent> = {
  'next-server-components': {
    title: 'Titre de l’article à rédiger',
    excerpt: 'Phrase d’introduction affichée dans la liste des articles, à rédiger.',
    Body: NextServerComponents,
  },
  'typescript-strict-mode': {
    title: 'Titre du second article à rédiger',
    excerpt: 'Phrase d’introduction du second article, à rédiger.',
    Body: TypeScriptStrictMode,
  },
}
