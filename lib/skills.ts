import { frenchSkillNames, skills } from '@/data/skills'
import { defaultLocale } from '@/lib/i18n'
import type { Locale } from '@/types/i18n'
import type { Skill, SkillCategory } from '@/types/skill'

/** Display order of the categories on the about page. */
export const skillCategories: SkillCategory[] = ['frontend', 'backend', 'tools', 'methodology']

/** Skills resolved in a locale, in declaration order. */
export function getSkills(locale: Locale): Skill[] {
  if (locale === defaultLocale) return skills

  return skills.map((skill) => ({ ...skill, name: frenchSkillNames[skill.name] ?? skill.name }))
}
