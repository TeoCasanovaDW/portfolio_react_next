import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Shell from '@/components/layout/Shell'
import { isLocale, locales } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Téo Casanova | Développeur React & Next.js',
  description:
    'Portfolio de Téo Casanova, développeur JavaScript / TypeScript orienté React et Next.js.',
}

/** Une locale inconnue n'est pas rendue à la demande : elle tombe sur la 404 globale du site. */
export const dynamicParams = false

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

  return <Shell locale={locale}>{children}</Shell>
}
