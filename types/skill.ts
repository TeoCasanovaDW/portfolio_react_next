import type { TechLogo, IconName } from './project'

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'tools'
  | 'methodology'

export type Skill = {
  name: string
  category: SkillCategory
  icon: TechLogo | IconName
}
