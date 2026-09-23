import ArticleCard from '@/components/blog/ArticleCard'
import { formatArticleDate, getArticles } from '@/lib/blog'
import { getDictionary, localizePath, resolveLocale } from '@/lib/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function BlogPage({ params }: Props) {
  const locale = resolveLocale((await params).locale)
  const { blog: copy } = getDictionary(locale)
  const articles = getArticles(locale)

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      {/* Title + introduction */}
      <div className="mb-30">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-20">
          {copy.title}
          <span className="text-accent">.</span>
        </h1>
        <div className="space-y-4">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-text-secondary text-base md:text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Article list */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              href={localizePath(`/blog/${article.slug}`, locale)}
              dateLabel={formatArticleDate(article.date, locale)}
              readingLabel={copy.readingTime.replace('{minutes}', String(article.readingMinutes))}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
