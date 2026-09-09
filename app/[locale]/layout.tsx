import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Shell from '@/components/layout/Shell'
import { getDictionary, isLocale, locales, resolveLocale } from '@/lib/i18n'
import { SITE_URL } from '@/lib/site'

type LayoutParams = { params: Promise<{ locale: string }> }

/**
 * Base des URLs absolues et métadonnées de repli de la locale, héritées par toute page
 * qui ne définit pas les siennes. Chaque page publique fournit ses propres `generateMetadata`.
 */
export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const { metadata } = getDictionary(locale)

  return {
    metadataBase: new URL(SITE_URL),
    ...metadata.home,
  }
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
