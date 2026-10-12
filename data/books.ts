import type { Book } from '@/types/book'

/** The book displayed on the home page. Change this slug when starting a new book. */
export const currentlyReadingSlug = 'the-80-20-principle'

/** Every book of the library, in reading order (the most recent first). */
export const books: Book[] = [
  {
    slug: 'the-80-20-principle',
    title: 'The 80/20 Principle',
    author: 'Richard Koch',
    cover: '/images/books/the-80-20-principle.jpg',
    language: 'en',
  },
  {
    slug: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: '/images/books/atomic-habits.jpg',
    language: 'en',
  },
  {
    slug: 'deep-work',
    title: 'Deep Work',
    author: 'Cal Newport',
    cover: '/images/books/deep-work.jpg',
    language: 'fr',
  },
]
