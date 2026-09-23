import { enProjects, frProjects, projectBases } from '@/data/projects'
import type { Locale } from '@/types/i18n'
import type { Project, ProjectBase, ProjectContent } from '@/types/project'

const contents: Record<Locale, Record<string, ProjectContent>> = {
  en: enProjects,
  fr: frProjects,
}

/** Merges the technical base and the translated content into a complete `Project`. */
function resolveProject(base: ProjectBase, content: ProjectContent): Project {
  return {
    slug: base.slug,
    name: base.name,
    year: base.year,
    type: content.type,
    shortDescription: content.shortDescription,
    description: content.description,
    image: base.image,
    links: base.links.map((link, index) => ({ ...link, label: content.linkLabels[index] })),
    tags: content.tags,
    techLogos: [...base.techLogos],
    stack: [...base.stack],
    context: content.context,
    technicalChoices: content.technicalChoices,
    features: base.featureIcons.map((icon, index) => ({
      icon,
      label: content.featureLabels[index],
    })),
    demonstrates: content.demonstrates,
    limits: content.limits,
  }
}

/** Projects resolved in a locale, in base order: Kasa first. */
export function getProjects(locale: Locale): Project[] {
  const content = contents[locale]

  return projectBases.map((base) => resolveProject(base, content[base.slug]))
}

/** Project resolved in a locale, or `undefined` if the slug is unknown. */
export function getProject(slug: string, locale: Locale): Project | undefined {
  const base = projectBases.find((project) => project.slug === slug)

  if (!base) return undefined

  return resolveProject(base, contents[locale][base.slug])
}

/** Project slugs, in display order. Identical in both languages. */
export const projectSlugs: string[] = projectBases.map((project) => project.slug)
