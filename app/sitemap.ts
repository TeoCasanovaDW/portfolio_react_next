import type { MetadataRoute } from 'next'
import { defaultLocale, locales } from '@/lib/i18n'
import { projectSlugs } from '@/lib/projects'
import { absoluteUrl } from '@/lib/site'

/** Pages publiques, hors `/dev/ui` qui est temporaire et hors périmètre. */
const paths = ['/', '/about', '/projects', '/contact']

/**
 * Une entrée par page et par langue, avec les `hreflang` des deux langues
 * et l'anglais en `x-default`. Les URLs anglaises restent sans préfixe.
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
