import LoginRedirectAiGeneratedCode from '@/content/blog/en/login-redirect-ai-generated-code.mdx'
import FromAiQuestionsToProjectStructure from '@/content/blog/en/from-ai-questions-to-project-structure.mdx'
import LearningGraphqlWithLessHelpfulAi from '@/content/blog/en/learning-graphql-with-less-helpful-ai.mdx'
import type { ArticleSlug } from './base'
import type { ArticleContent } from '@/types/article'

/**
 * Article contents in English.
 * Each entry pairs its title, its list excerpt and its MDX body.
 */
export const enArticles: Record<ArticleSlug, ArticleContent> = {
  'learning-graphql-with-less-helpful-ai': {
    title: 'Learning GraphQL by making AI less helpful',
    excerpt:
      'How I built a small learning system around ChatGPT, with one concept per conversation, hints before answers and topics deliberately kept for later.',
    Body: LearningGraphqlWithLessHelpfulAi,
  },
  'from-ai-questions-to-project-structure': {
    title: 'From asking AI questions to giving it a project structure',
    excerpt:
      'How my AI workflow moved from pasting code into a chat to a project with a scope, short specs and bounded tasks, and why context mattered more than prompts.',
    Body: FromAiQuestionsToProjectStructure,
  },
  'login-redirect-ai-generated-code': {
    title: 'A small login redirect that made me rethink AI-generated code',
    excerpt:
      'A four-line feature turned into a lesson on open redirects, URL parsing, and why the best fix was removing the problem instead of validating it.',
    Body: LoginRedirectAiGeneratedCode,
  },
}
