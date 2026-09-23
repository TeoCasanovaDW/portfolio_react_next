export type IconName =
  | 'github'
  | 'linkedin'
  | 'x'
  | 'arrowRight'
  | 'arrowLeft'
  | 'copy'
  | 'copyLight'
  | 'menu'
  | 'auth'
  | 'route'
  | 'dashboard'
  | 'chart'
  | 'api'
  | 'loading'
  | 'logout'
  | 'sync'
  | 'history'
  | 'filter'
  | 'monitoring'
  | 'link'
  | 'send'

export type TechLogo =
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'next'
  | 'node'
  | 'postgresql'
  | 'supabase'
  | 'vercel'
  | 'figma'
  | 'git'
  | 'github'
  | 'vitest'
  | 'agile'
  | 'sdd'
  | 'auth'
  | 'mistral'
  | 'docker'
  | 'cypress'

export type ProjectLink = {
  label: string
  href: string
  icon?: IconName
  variant: 'primary' | 'secondary' | 'dark'
}

export type ProjectFeature = {
  label: string
  icon: IconName
}

/** Project link without its label: the untranslated part of a link. */
export type ProjectLinkBase = Omit<ProjectLink, 'label'>

/**
 * Untranslated part of a project: identity, media, links, stack and icons.
 * Shared by both languages.
 */
export type ProjectBase = {
  slug: string
  name: string
  year: string
  image: string
  links: readonly ProjectLinkBase[]
  techLogos: readonly TechLogo[]
  stack: readonly string[]
  featureIcons: readonly IconName[]
}

/**
 * Translated part of a project.
 * `linkLabels` and `featureLabels` follow the order of `links` and `featureIcons` in the base.
 */
export type ProjectContent = {
  type: string
  shortDescription: string
  description: string
  tags: string[]
  linkLabels: string[]
  context: string
  technicalChoices: string[]
  featureLabels: string[]
  demonstrates: string[]
  limits: string[]
}

/** Project resolved in a locale, as consumed by the components. */
export type Project = {
  slug: string
  name: string
  year: string
  type: string
  shortDescription: string
  description: string
  image: string
  links: ProjectLink[]
  tags: string[]
  techLogos: TechLogo[]
  stack: string[]
  context: string
  technicalChoices: string[]
  features: ProjectFeature[]
  demonstrates: string[]
  limits: string[]
}
