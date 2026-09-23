import type { Skill } from '@/types/skill'

/**
 * Skills, with English labels.
 * Most of them are technology names, identical in both languages.
 */
export const skills: Skill[] = [
  // Frontend
  { name: 'JavaScript', category: 'frontend', icon: 'javascript' },
  { name: 'React', category: 'frontend', icon: 'react' },
  { name: 'TypeScript', category: 'frontend', icon: 'typescript' },
  { name: 'Next.js', category: 'frontend', icon: 'next' },

  // Backend
  { name: 'Node', category: 'backend', icon: 'node' },
  { name: 'PostgreSQL', category: 'backend', icon: 'postgresql' },
  { name: 'Authentication', category: 'backend', icon: 'auth' },
  { name: 'Supabase', category: 'backend', icon: 'supabase' },
  { name: 'REST API', category: 'backend', icon: 'api' },
  { name: 'GraphQL', category: 'backend', icon: 'graphql' },

  // Tools
  { name: 'Vercel', category: 'tools', icon: 'vercel' },
  { name: 'Figma', category: 'tools', icon: 'figma' },
  { name: 'Git', category: 'tools', icon: 'git' },
  { name: 'GitHub', category: 'tools', icon: 'github' },
  { name: 'Vitest', category: 'tools', icon: 'vitest' },

  // Working methods
  { name: 'Agile', category: 'methodology', icon: 'agile' },
  { name: 'Spec Driven Development', category: 'methodology', icon: 'sdd' },
]

/** Only these two labels are translated into French, the others are proper nouns. */
export const frenchSkillNames: Record<string, string> = {
  Authentication: 'Authentification',
  'REST API': 'API REST',
}
