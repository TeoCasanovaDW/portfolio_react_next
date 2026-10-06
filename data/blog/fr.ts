import LoginRedirectAiGeneratedCode from '@/content/blog/fr/login-redirect-ai-generated-code.mdx'
import FromAiQuestionsToProjectStructure from '@/content/blog/fr/from-ai-questions-to-project-structure.mdx'
import LearningGraphqlWithLessHelpfulAi from '@/content/blog/fr/learning-graphql-with-less-helpful-ai.mdx'
import type { ArticleSlug } from './base'
import type { ArticleContent } from '@/types/article'

/**
 * Article contents in French.
 * Each entry pairs its title, its list excerpt and its MDX body.
 */
export const frArticles: Record<ArticleSlug, ArticleContent> = {
  'learning-graphql-with-less-helpful-ai': {
    title: 'Apprendre GraphQL en rendant volontairement l’IA moins utile',
    excerpt:
      'Comment j’ai construit un petit système d’apprentissage autour de ChatGPT : une notion par conversation, des indices avant les réponses et des sujets volontairement repoussés à plus tard.',
    Body: LearningGraphqlWithLessHelpfulAi,
  },
  'from-ai-questions-to-project-structure': {
    title: 'De questions posées à l’IA à un projet structuré pour elle',
    excerpt:
      'Comment mon usage de l’IA est passé du code collé dans un chat à un projet avec un scope, des specs courtes et des tâches bornées, et pourquoi le contexte a compté plus que les prompts.',
    Body: FromAiQuestionsToProjectStructure,
  },
  'login-redirect-ai-generated-code': {
    title: "Une petite redirection de connexion qui m'a fait repenser le code généré par IA",
    excerpt:
      "Une fonctionnalité de quatre lignes devenue une leçon sur les redirections ouvertes, le parsing d'URL, et sur le fait que la meilleure correction a été de supprimer le problème plutôt que de le valider.",
    Body: LoginRedirectAiGeneratedCode,
  },
}
