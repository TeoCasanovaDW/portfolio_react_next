import type { Book } from '@/types/book'
import Badge from '@/components/ui/Badge'
import BookCover from '@/components/books/BookCover'

type Props = {
  book: Book
  /** Name of the language the book was read in, already resolved in the current locale. */
  languageLabel: string
  /** Label of the pill shown over the cover, e.g. "Reading" for the book in progress. */
  statusLabel?: string
}

export default function BookCard({ book, languageLabel, statusLabel }: Props) {
  return (
    <article className="flex flex-col gap-4">
      <div className="relative">
        <BookCover src={book.cover} alt={`${book.title} — ${book.author}`} />
        {statusLabel && (
          <div className="absolute top-3 right-3 z-10 pointer-events-none">
            <Badge label={statusLabel} variant="accent" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="font-heading text-lg font-semibold text-white leading-snug">{book.title}</h3>
        <p className="text-text-secondary text-sm">{book.author}</p>
        <div className="mt-1">
          <Badge label={languageLabel} variant="dark" />
        </div>
      </div>
    </article>
  )
}
