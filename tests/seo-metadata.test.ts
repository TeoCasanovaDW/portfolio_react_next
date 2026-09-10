import { describe, expect, it } from 'vitest'
import { SITE_URL, absoluteUrl, localeAlternates } from '@/lib/site'
import sitemap from '@/app/sitemap'
import { generateMetadata as projectMetadata } from '@/app/[locale]/projects/[slug]/page'
import { getDictionary, locales } from '@/lib/i18n'
import { getProject, projectSlugs } from '@/lib/projects'

const publicPaths = ['/', '/about', '/projects', '/contact']
const allPaths = [...publicPaths, ...projectSlugs.map((slug) => `/projects/${slug}`)]

/** Toutes les URLs absolues produites par les métadonnées et le sitemap. */
function everyEmittedUrl(): string[] {
  const fromAlternates = allPaths.flatMap((path) =>
    locales.flatMap((locale) => {
      const alternates = localeAlternates(path, locale)!
      return [alternates.canonical as string, ...Object.values(alternates.languages ?? {})]
    })
  )
  const fromSitemap = sitemap().flatMap((entry) => [
    entry.url,
    ...Object.values(entry.alternates?.languages ?? {}),
  ])

  return [...fromAlternates, ...fromSitemap].map(String)
}

describe('absolute URLs', () => {
  it('never prefixes english and always prefixes french', () => {
    expect(absoluteUrl('/', 'en')).toBe(`${SITE_URL}/`)
    expect(absoluteUrl('/about', 'en')).toBe(`${SITE_URL}/about`)
    expect(absoluteUrl('/', 'fr')).toBe(`${SITE_URL}/fr`)
    expect(absoluteUrl('/about', 'fr')).toBe(`${SITE_URL}/fr/about`)
  })

  it('exposes an origin without a trailing slash', () => {
    expect(SITE_URL).not.toMatch(/\/$/)
  })
})

describe('alternates', () => {
  it.each(locales)('points the canonical at the %s URL of the current page', (locale) => {
    for (const path of allPaths) {
      expect(localeAlternates(path, locale)!.canonical).toBe(absoluteUrl(path, locale))
    }
  })

  it('declares both languages plus an english x-default', () => {
    const languages = localeAlternates('/about', 'fr')!.languages!

    expect(Object.keys(languages).sort()).toEqual(['en', 'fr', 'x-default'])
    expect(languages.en).toBe(`${SITE_URL}/about`)
    expect(languages.fr).toBe(`${SITE_URL}/fr/about`)
    expect(languages['x-default']).toBe(`${SITE_URL}/about`)
  })
})

describe('sitemap', () => {
  it('lists every public page in both languages', () => {
    const urls = sitemap().map((entry) => entry.url)

    expect(urls).toHaveLength(allPaths.length * locales.length)
    for (const path of allPaths) {
      for (const locale of locales) {
        expect(urls).toContain(absoluteUrl(path, locale))
      }
    }
  })

  it('excludes the temporary /dev/ui page', () => {
    expect(sitemap().every((entry) => !entry.url.includes('/dev/ui'))).toBe(true)
  })

  it('carries hreflang alternates on every entry', () => {
    for (const entry of sitemap()) {
      expect(Object.keys(entry.alternates?.languages ?? {}).sort()).toEqual([
        'en',
        'fr',
        'x-default',
      ])
    }
  })
})

describe('no /en/... URL is ever published', () => {
  it('holds for canonicals, hreflang and the sitemap', () => {
    const offenders = everyEmittedUrl().filter((url) => new URL(url).pathname.match(/^\/en(\/|$)/))

    expect(offenders).toEqual([])
  })
})

describe('project detail metadata', () => {
  it.each(locales)('builds title and description from the %s project', async (locale) => {
    for (const slug of projectSlugs) {
      const project = getProject(slug, locale)!
      const metadata = await projectMetadata({ params: Promise.resolve({ locale, slug }) })

      expect(metadata.title).toBe(
        getDictionary(locale).metadata.project.title.replace('{name}', project.name)
      )
      expect(metadata.description).toBe(project.description)
      expect(metadata.alternates?.canonical).toBe(absoluteUrl(`/projects/${slug}`, locale))
    }
  })

  it('describes the same project differently in each language', async () => {
    const en = await projectMetadata({ params: Promise.resolve({ locale: 'en', slug: 'abricot' }) })
    const fr = await projectMetadata({ params: Promise.resolve({ locale: 'fr', slug: 'abricot' }) })

    expect(en.description).not.toBe(fr.description)
  })
})

describe('page metadata', () => {
  it.each(locales)('gives every %s page its own title and description', (locale) => {
    const { metadata } = getDictionary(locale)
    const pages = [metadata.home, metadata.about, metadata.projects, metadata.contact, metadata.notFound]
    const titles = pages.map((page) => page.title)

    expect(new Set(titles).size).toBe(titles.length)
    for (const page of pages) {
      expect(page.description.length).toBeGreaterThan(0)
    }
  })
})
