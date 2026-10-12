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
  | 'sendLight'

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
  | 'storybook'
  | 'agile'
  | 'sdd'
  | 'auth'
  | 'mistral'
  | 'docker'
  | 'cypress'
  | 'graphql'

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

/** Category of a stack group; its label is translated in the dictionary (`project.stackCategories`). */
export type StackCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'testing'
  | 'deployment'
  | 'tools'

/** Technologies of a project belonging to the same category. */
export type StackGroup = {
  category: StackCategory
  items: readonly string[]
}

/** Video of a project with its poster. Captions are translated in the dictionary. */
export type ProjectVideo = {
  src: string
  poster: string
  /** Pixel size of the source, used to reserve the right aspect ratio. */
  width: number
  height: number
}

/** Optional marketing media of a project: two ads and a store-style panel. */
export type ProjectMedia = {
  portraitVideo: ProjectVideo
  landscapeVideo: ProjectVideo
  storePanel: { src: string; width: number; height: number }
}

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
  stack: readonly StackGroup[]
  featureIcons: readonly IconName[]
  media?: ProjectMedia
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
  stack: StackGroup[]
  context: string
  technicalChoices: string[]
  features: ProjectFeature[]
  demonstrates: string[]
  limits: string[]
  media?: ProjectMedia
}
