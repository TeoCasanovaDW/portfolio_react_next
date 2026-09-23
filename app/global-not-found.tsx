import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Shell from '@/components/layout/Shell'
import Button from '@/components/ui/Button'
import { getDictionary, localizePath, resolveLocale } from '@/lib/i18n'

/**
 * The site's single 404: URLs with no matching route as well as unknown project slugs.
 * Since the root layout lives under `[locale]`, this page renders its own HTML shell
 * and reads the locale from the `x-locale` header set by the proxy.
 */
async function requestedLocale() {
  return resolveLocale((await headers()).get('x-locale') ?? undefined)
}

export async function generateMetadata(): Promise<Metadata> {
  const { metadata } = getDictionary(await requestedLocale())

  return metadata.notFound
}

export default async function GlobalNotFound() {
  const locale = await requestedLocale()
  const { cta, notFound } = getDictionary(locale)

  return (
    <Shell locale={locale}>
      <div className="flex min-h-[calc(100vh-80px)] items-center">
        <div className="max-w-[1200px] mx-auto px-6 py-16">

          <p className="font-heading text-sm font-medium tracking-widest uppercase text-accent mb-6">
            {notFound.code}
          </p>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-[56px] font-semibold text-white leading-tight mb-8">
            {notFound.title}<span className="text-accent">.</span>
          </h1>

          <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-10 max-w-md">
            {notFound.description}
          </p>

          <Button
            label={cta.backHome}
            variant="primary"
            icon="arrowLeft"
            iconPosition="left"
            href={localizePath('/', locale)}
          />

        </div>
      </div>
    </Shell>
  )
}
