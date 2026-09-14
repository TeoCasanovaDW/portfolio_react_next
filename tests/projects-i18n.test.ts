import { describe, expect, it } from 'vitest'
import { locales } from '@/lib/i18n'
import { getProject, getProjects, projectSlugs } from '@/lib/projects'
import { enProjects, frProjects, projectBases } from '@/data/projects'
import type { ProjectContent } from '@/types/project'

const contentsByLocale = { en: enProjects, fr: frProjects } as const

/** Listes traduites dont la longueur doit rester alignée entre les deux langues. */
const parallelLists = [
  'tags',
  'linkLabels',
  'technicalChoices',
  'featureLabels',
  'demonstrates',
  'limits',
] as const satisfies readonly (keyof ProjectContent)[]

const localeProjectPairs = locales.flatMap((locale) =>
  projectBases.map((base) => [locale, base.slug] as const)
)

describe('project content integrity', () => {
  it.each(localeProjectPairs)(
    '%s / %s declares one link label per link and one feature label per icon',
    (locale, slug) => {
      const base = projectBases.find((project) => project.slug === slug)!
      const content = contentsByLocale[locale][slug]

      expect(content.linkLabels).toHaveLength(base.links.length)
      expect(content.featureLabels).toHaveLength(base.featureIcons.length)
    }
  )

  it.each(projectSlugs)('%s keeps parallel translated lists the same length in en and fr', (slug) => {
    const en = enProjects[slug as keyof typeof enProjects]
    const fr = frProjects[slug as keyof typeof frProjects]

    for (const key of parallelLists) {
      expect({ [key]: fr[key].length }).toEqual({ [key]: en[key].length })
    }
  })

  it.each(localeProjectPairs)('%s / %s resolves every label to a non-empty string', (locale, slug) => {
    const project = getProject(slug, locale)!

    for (const link of project.links) {
      expect(typeof link.label).toBe('string')
      expect(link.label.trim()).not.toBe('')
    }
    for (const feature of project.features) {
      expect(typeof feature.label).toBe('string')
      expect(feature.label.trim()).not.toBe('')
    }
  })

  it.each(localeProjectPairs)('%s / %s keeps link hrefs and icons attached to the right label', (locale, slug) => {
    const base = projectBases.find((project) => project.slug === slug)!
    const project = getProject(slug, locale)!
    const labels = contentsByLocale[locale][slug].linkLabels

    expect(project.links.map((link) => link.href)).toEqual(base.links.map((link) => link.href))
    expect(project.links.map((link) => link.icon)).toEqual(base.links.map((link) => link.icon))
    expect(project.links.map((link) => link.label)).toEqual(labels)

    expect(project.features.map((feature) => feature.icon)).toEqual([...base.featureIcons])
    expect(project.features.map((feature) => feature.label)).toEqual(
      contentsByLocale[locale][slug].featureLabels
    )
  })
})

describe('project catalogue', () => {
  it('exposes the same projects in the same order in both languages', () => {
    for (const locale of locales) {
      expect(getProjects(locale).map((project) => project.slug)).toEqual(projectSlugs)
    }
    expect(projectSlugs[0]).toBe('kasa')
  })

  it('keeps untranslated data identical across languages', () => {
    const en = getProjects('en')
    const fr = getProjects('fr')

    expect(fr.map(({ slug, name, year, image, techLogos, stack }) => ({ slug, name, year, image, techLogos, stack }))).toEqual(
      en.map(({ slug, name, year, image, techLogos, stack }) => ({ slug, name, year, image, techLogos, stack }))
    )
  })

  it('returns undefined for an unknown slug in both languages', () => {
    for (const locale of locales) {
      expect(getProject('inexistant', locale)).toBeUndefined()
    }
  })

  it('translates the AI tag and keeps the capability wording of AI Model Radar', () => {
    expect(getProject('abricot', 'en')!.tags).toContain('AI')
    expect(getProject('abricot', 'fr')!.tags).toContain('IA')

    const radar = getProject('ai-model-radar', 'en')!
    expect(radar.features[0].label).toBe('Scheduled daily sync')
  })
})
