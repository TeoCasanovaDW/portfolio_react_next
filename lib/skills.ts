import { frenchSkillNames, skills } from '@/data/skills'
import { defaultLocale } from '@/lib/i18n'
import type { Locale } from '@/types/i18n'
import type { Skill, SkillCategory } from '@/types/skill'

/** Ordre d'affichage des catégories sur la page « à propos ». */
export const skillCategories: SkillCategory[] = ['frontend', 'backend', 'tools', 'methodology']

/** Compétences résolues dans une locale, dans l'ordre de déclaration. */
export function getSkills(locale: Locale): Skill[] {
  if (locale === defaultLocale) return skills

  return skills.map((skill) => ({ ...skill, name: frenchSkillNames[skill.name] ?? skill.name }))
}
