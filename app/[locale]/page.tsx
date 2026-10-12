import type { Metadata } from 'next'
import BookCover from '@/components/books/BookCover'
import NowCard from '@/components/home/NowCard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { books, currentlyReadingSlug } from '@/data/books'
import { contact } from '@/data/contact'
import { workingOn } from '@/data/now'
import { getDictionary, localizePath, resolveLocale } from '@/lib/i18n'
import { localeAlternates } from '@/lib/site'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const { metadata } = getDictionary(locale)

  return { ...metadata.home, alternates: localeAlternates('/', locale) }
}

export default async function HomePage({ params }: Props) {
  const locale = resolveLocale((await params).locale)
  const { cta, home, now, books: booksCopy } = getDictionary(locale)
  const { languages } = booksCopy
  const reading = books.find((book) => book.slug === currentlyReadingSlug) ?? books[0]

  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center">
      <div className="w-full max-w-[1200px] mx-auto px-6 py-16">
        <div className="max-w-[900px]">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-[56px] font-semibold text-white leading-tight mb-14">
            {home.titleStart} <span className="text-accent">/</span> {home.titleEnd}
          </h1>

          <div className="space-y-4 mb-10">
            {home.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-text-secondary text-base md:text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button
              label={cta.viewProjects}
              variant="primary"
              icon="arrowRight"
              href={localizePath('/projects', locale)}
              className="w-full sm:w-auto justify-center"
            />
            <Button
              label={cta.contactMe}
              variant="dark"
              href={localizePath('/contact', locale)}
              className="w-full sm:w-auto justify-center"
            />
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-4">
            {contact.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="opacity-70 hover:opacity-100 transition-opacity duration-200"
              >
                <Icon name={link.icon} size={22} alt="" />
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14">
            <NowCard
              label={now.readingLabel}
              media={<BookCover src={reading.cover} alt={reading.title} className="w-24 shrink-0 self-start" />}
              title={reading.title}
              subtitle={reading.author}
              footer={<Badge label={languages[reading.language]} variant="dark" />}
              link={{ label: now.viewBooks, href: localizePath('/books', locale) }}
            />
            <NowCard
              label={now.workingLabel}
              title={workingOn.name[locale]}
              subtitle={workingOn.description[locale]}
              footer={<Badge label={now.privateProject} variant="dark" />}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
