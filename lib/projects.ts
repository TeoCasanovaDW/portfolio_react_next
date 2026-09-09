import { enProjects, frProjects, projectBases } from '@/data/projects'
import type { Locale } from '@/types/i18n'
import type { Project, ProjectBase, ProjectContent } from '@/types/project'

const contents: Record<Locale, Record<string, ProjectContent>> = {
  en: enProjects,
  fr: frProjects,
}

/** Fusionne la base technique et le contenu traduit en un `Project` complet. */
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

/** Projets résolus dans une locale, dans l'ordre de la base : Abricot en premier. */
export function getProjects(locale: Locale): Project[] {
  const content = contents[locale]

  return projectBases.map((base) => resolveProject(base, content[base.slug]))
}

/** Projet résolu dans une locale, ou `undefined` si le slug est inconnu. */
export function getProject(slug: string, locale: Locale): Project | undefined {
  const base = projectBases.find((project) => project.slug === slug)

  if (!base) return undefined

  return resolveProject(base, contents[locale][base.slug])
}

/** Slugs des projets, dans l'ordre d'affichage. Identiques dans les deux langues. */
export const projectSlugs: string[] = projectBases.map((project) => project.slug)
