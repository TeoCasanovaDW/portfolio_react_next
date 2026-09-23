import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { articleSlugs, formatArticleDate, getArticle } from '@/lib/blog'
import { getDictionary, localizePath, resolveLocale } from '@/lib/i18n'
import { localeAlternates } from '@/lib/site'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

/** An unknown slug is not rendered on demand: it falls through to the global 404. */
export const dynamicParams = false

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }))
}

/** Title and description taken from the article resolved in the current locale. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  const locale = resolveLocale(rawLocale)
  const article = getArticle(slug, locale)

  if (!article) return {}

  const { metadata } = getDictionary(locale)

  return {
    title: metadata.article.title.replace('{title}', article.title),
    description: article.excerpt,
    alternates: localeAlternates(`/blog/${article.slug}`, locale),
  }
}

export default async function ArticlePage({ params }: Props) {
  const { locale: rawLocale, slug } = await params
  const locale = resolveLocale(rawLocale)
  const { cta, blog: copy } = getDictionary(locale)
  const article = getArticle(slug, locale)

  if (!article) notFound()

  const { Body } = article

  return (
    <div className="max-w-[720px] mx-auto px-6 py-16">
      {/* Back link */}
      <div className="mb-14">
        <Button
          label={cta.backToBlog}
          variant="dark"
          icon="arrowLeft"
          iconPosition="left"
          href={localizePath('/blog', locale)}
        />
      </div>

      {/* Header: date, reading time, title, tags */}
      <div className="mb-12">
        <div className="flex items-center gap-3 text-xs text-text-secondary mb-4">
          <time dateTime={article.date}>{formatArticleDate(article.date, locale)}</time>
          <span aria-hidden="true">·</span>
          <span>{copy.readingTime.replace('{minutes}', String(article.readingMinutes))}</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-6">
          {article.title}
          <span className="text-accent">.</span>
        </h1>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} label={tag} variant="light" />
          ))}
        </div>
      </div>

      {/* MDX body */}
      <Body />

      {/* Bottom CTA */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-20">
        <Button
          label={cta.backToBlog}
          variant="dark"
          icon="arrowLeft"
          iconPosition="left"
          href={localizePath('/blog', locale)}
        />
        <Button
          label={cta.contactMe}
          variant="primary"
          icon="arrowRight"
          href={localizePath('/contact', locale)}
        />
      </div>
    </div>
  )
}
