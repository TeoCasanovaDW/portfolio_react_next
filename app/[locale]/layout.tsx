import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import Header from '@/components/layout/Header'
import { isLocale, locales } from '@/lib/i18n'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Téo Casanova | Développeur React & Next.js',
  description:
    'Portfolio de Téo Casanova, développeur JavaScript / TypeScript orienté React et Next.js.',
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  )
}
