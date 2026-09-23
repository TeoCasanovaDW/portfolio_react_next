import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Shell from '@/components/layout/Shell'
import { getDictionary, isLocale, locales, resolveLocale } from '@/lib/i18n'
import { SITE_URL } from '@/lib/site'

type LayoutParams = { params: Promise<{ locale: string }> }

/**
 * Base for absolute URLs and fallback metadata of the locale, inherited by every page
 * that does not define its own. Every public page provides its own `generateMetadata`.
 */
export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const { metadata } = getDictionary(locale)

  return {
    metadataBase: new URL(SITE_URL),
    ...metadata.home,
  }
}

/** An unknown locale is not rendered on demand: it falls through to the global 404. */
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
