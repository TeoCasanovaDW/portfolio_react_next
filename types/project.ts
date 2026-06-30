export type IconName =
  | 'github'
  | 'linkedin'
  | 'arrowRight'
  | 'arrowLeft'
  | 'copy'
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
