import NextServerComponents from '@/content/blog/en/next-server-components.mdx'
import TypeScriptStrictMode from '@/content/blog/en/typescript-strict-mode.mdx'
import type { ArticleSlug } from './base'
import type { ArticleContent } from '@/types/article'

/**
 * Article contents in English.
 * Each entry pairs its title, its list excerpt and its MDX body.
 */
export const enArticles: Record<ArticleSlug, ArticleContent> = {
  'next-server-components': {
    title: 'Article title to be written',
    excerpt: 'Introduction sentence shown in the article list, to be written.',
    Body: NextServerComponents,
  },
  'typescript-strict-mode': {
    title: 'Second article title to be written',
    excerpt: 'Introduction sentence for the second article, to be written.',
    Body: TypeScriptStrictMode,
  },
}
