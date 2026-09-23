import type { MetadataRoute } from 'next'
import { defaultLocale, locales } from '@/lib/i18n'
import { projectSlugs } from '@/lib/projects'
import { absoluteUrl } from '@/lib/site'

/** Public pages, excluding `/dev/ui` which is temporary and out of scope. */
const paths = ['/', '/about', '/projects', '/contact']

/**
 * One entry per page and per language, with the `hreflang` of both languages
 * and English as `x-default`. English URLs stay unprefixed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const allPaths = [...paths, ...projectSlugs.map((slug) => `/projects/${slug}`)]

  return allPaths.flatMap((path) => {
    const languages = {
      ...Object.fromEntries(locales.map((code) => [code, absoluteUrl(path, code)])),
      'x-default': absoluteUrl(path, defaultLocale),
    }

    return locales.map((locale) => ({
      url: absoluteUrl(path, locale),
      alternates: { languages },
    }))
  })
}
