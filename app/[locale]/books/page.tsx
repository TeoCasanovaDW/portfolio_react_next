import type { Metadata } from 'next'
import BookCard from '@/components/books/BookCard'
import { books, currentlyReadingSlug } from '@/data/books'
import { getDictionary, resolveLocale } from '@/lib/i18n'
import { localeAlternates } from '@/lib/site'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const { metadata } = getDictionary(locale)

  return { ...metadata.books, alternates: localeAlternates('/books', locale) }
}

export default async function BooksPage({ params }: Props) {
  const locale = resolveLocale((await params).locale)
  const { books: copy } = getDictionary(locale)

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-8">
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {books.map((book) => (
          <BookCard
            key={book.slug}
            book={book}
            languageLabel={copy.languages[book.language]}
            statusLabel={book.slug === currentlyReadingSlug ? copy.currentlyReading : undefined}
          />
        ))}
      </div>
    </div>
  )
}
