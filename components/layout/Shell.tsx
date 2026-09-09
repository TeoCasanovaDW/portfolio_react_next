import { Inter, Space_Grotesk } from 'next/font/google'
import '@/app/globals.css'
import Header from '@/components/layout/Header'
import { getNavigation } from '@/data/navigation'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/types/i18n'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

/**
 * Enveloppe HTML du site, partagée par le layout de locale et par `global-not-found.tsx`
 * qui ne peut pas s'appuyer sur ce layout puisqu'il vit sous le segment `[locale]`.
 */
export default function Shell({
  locale,
  children,
}: Readonly<{
  locale: Locale
  children: React.ReactNode
}>) {
  const dictionary = getDictionary(locale)

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Header locale={locale} items={getNavigation(dictionary)} nav={dictionary.nav} />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  )
}
