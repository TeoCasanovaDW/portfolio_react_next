export type IconName =
  | 'github'
  | 'linkedin'
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

/** Lien projet sans son libellé : la partie non traduite d'un lien. */
export type ProjectLinkBase = Omit<ProjectLink, 'label'>

/**
 * Partie non traduite d'un projet : identité, média, liens, stack et icônes.
 * Partagée par les deux langues.
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
 * Partie traduite d'un projet.
 * `linkLabels` et `featureLabels` suivent l'ordre de `links` et `featureIcons` de la base.
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

/** Projet résolu dans une locale, tel que consommé par les composants. */
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
