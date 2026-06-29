import type { Skill } from '@/types/skill'

export const skills: Skill[] = [
  // Frontend
  { name: 'JavaScript', category: 'frontend', icon: 'javascript' },
  { name: 'React', category: 'frontend', icon: 'react' },
  { name: 'TypeScript', category: 'frontend', icon: 'typescript' },
  { name: 'Next.js', category: 'frontend', icon: 'next' },

  // Backend
  { name: 'Node', category: 'backend', icon: 'node' },
  { name: 'PostgreSQL', category: 'backend', icon: 'postgresql' },
  { name: 'Authentification', category: 'backend', icon: 'auth' },
  { name: 'Supabase', category: 'backend', icon: 'supabase' },
  { name: 'API REST', category: 'backend', icon: 'api' },

  // Outils
  { name: 'Vercel', category: 'tools', icon: 'vercel' },
  { name: 'Figma', category: 'tools', icon: 'figma' },
  { name: 'Git', category: 'tools', icon: 'git' },
  { name: 'GitHub', category: 'tools', icon: 'github' },
  { name: 'Vitest', category: 'tools', icon: 'vitest' },

  // Méthodes
  { name: 'Agile', category: 'methodology', icon: 'agile' },
  { name: 'Spec Driven Development', category: 'methodology', icon: 'sdd' },
]
