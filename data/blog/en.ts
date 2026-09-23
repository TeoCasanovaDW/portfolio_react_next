import LoginRedirectAiGeneratedCode from '@/content/blog/en/login-redirect-ai-generated-code.mdx'
import type { ArticleSlug } from './base'
import type { ArticleContent } from '@/types/article'

/**
 * Article contents in English.
 * Each entry pairs its title, its list excerpt and its MDX body.
 */
export const enArticles: Record<ArticleSlug, ArticleContent> = {
  'login-redirect-ai-generated-code': {
    title: 'A small login redirect that made me rethink AI-generated code',
    excerpt:
      'A four-line feature turned into a lesson on open redirects, URL parsing, and why the best fix was removing the problem instead of validating it.',
    Body: LoginRedirectAiGeneratedCode,
  },
}
