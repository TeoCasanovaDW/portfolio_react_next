import Link from 'next/link'
import type { Article } from '@/types/article'
import Badge from '@/components/ui/Badge'

type Props = {
  article: Article
  /** Path to the detail page, already prefixed with the current locale. */
  href: string
  /** Publication date, already formatted and localized. */
  dateLabel: string
  /** Reading time, already resolved in the current locale (e.g. "7 min read"). */
  readingLabel: string
}

export default function ArticleCard({ article, href, dateLabel, readingLabel }: Props) {
  return (
    <article className="group relative bg-surface rounded-2xl border border-[#e5e5e5]/20 overflow-hidden hover:border-[#e5e5e5]/30 has-[a:focus-visible]:border-accent transition-colors duration-200">
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <time dateTime={article.date}>{dateLabel}</time>
          <span>{readingLabel}</span>
        </div>

        <div>
          {/* Stretched link: the ::after overlay makes the whole card clickable */}
          <Link href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
            <h3 className="font-heading text-xl font-semibold text-white group-hover:text-accent transition-colors duration-150">
              {article.title}
            </h3>
          </Link>
          <p className="text-text-secondary text-sm leading-relaxed mt-2">{article.excerpt}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} label={tag} variant="light" />
          ))}
        </div>
      </div>
    </article>
  )
}
