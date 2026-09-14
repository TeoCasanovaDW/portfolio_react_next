import type { ProjectBase } from '@/types/project'

/**
 * Base technique des projets, identique dans les deux langues.
 * L'ordre de ce tableau est l'ordre d'affichage : Kasa reste en première position.
 */
export const projectBases = [
  {
    slug: 'kasa',
    name: 'Kasa',
    year: '2026',
    image: '/images/projects/kasa.png',
    links: [
      {
        href: 'https://rentaplacekasa.netlify.app/',
        icon: 'link',
        variant: 'primary',
      },
      {
        href: 'https://github.com/TeoCasanovaDW/KASA',
        icon: 'github',
        variant: 'dark',
      },
    ],
    techLogos: ['next', 'typescript', 'react', 'node', 'auth', 'vitest'],
    stack: [
      'Next.js App Router',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Express',
      'SQLite',
      'JWT',
      'Vitest / RTL',
      'Netlify',
      'Railway',
    ],
    featureIcons: [
      'auth',
      'copyLight',
      'send',
      'filter',
      'logout',
      'sync',
      'monitoring',
      'dashboard',
    ],
  },
  {
    slug: 'abricot',
    name: 'Abricot',
    year: '2026',
    image: '/images/projects/abricot.png',
    links: [
      {
        href: 'https://abricot-front.vercel.app/',
        icon: 'link',
        variant: 'primary',
      },
      {
        href: 'https://github.com/TeoCasanovaDW/ABRICOT',
        icon: 'github',
        variant: 'dark',
      },
    ],
    techLogos: ['next', 'typescript', 'auth', 'mistral', 'docker', 'cypress'],
    stack: [
      'Next.js App Router',
      'TypeScript',
      'React',
      'React Hook Form',
      'Zod',
      'CSS Modules',
      'Express',
      'Prisma',
      'PostgreSQL / Supabase',
      'Mistral API',
      'Docker',
      'Vitest / RTL',
      'Cypress',
      'GitHub Actions',
    ],
    featureIcons: ['dashboard', 'route', 'auth', 'monitoring', 'api', 'auth', 'dashboard'],
  },
  {
    slug: 'portfolio',
    name: 'Portfolio',
    year: '2026',
    image: '/images/projects/portfolio.png',
    links: [
      {
        href: 'https://github.com/TeoCasanovaDW/portfolio_react_next',
        icon: 'github',
        variant: 'dark',
      },
    ],
    techLogos: ['next', 'typescript', 'react', 'vercel', 'figma'],
    stack: [
      'Next.js App Router',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Resend',
      'Vercel',
      'Figma',
    ],
    featureIcons: ['dashboard', 'route', 'api', 'api', 'copyLight'],
  },
  {
    slug: 'ai-model-radar',
    name: 'AI Model Radar',
    year: '2026',
    image: '/images/projects/ai-model-radar.png',
    links: [
      {
        href: 'https://github.com/TeoCasanovaDW/ai-radar',
        icon: 'github',
        variant: 'dark',
      },
    ],
    techLogos: ['typescript', 'next', 'supabase', 'postgresql', 'vercel'],
    stack: [
      'Next.js App Router',
      'TypeScript',
      'Tailwind CSS',
      'shadcn/ui',
      'Supabase PostgreSQL',
      'OpenRouter API',
      'Vercel Cron',
    ],
    featureIcons: ['sync', 'history', 'filter', 'route', 'dashboard', 'monitoring', 'link'],
  },
  {
    slug: 'sportsee',
    name: 'SportSee',
    year: '2026',
    image: '/images/projects/sportsee.png',
    links: [
      {
        href: 'https://github.com/TeoCasanovaDW/sportsee',
        icon: 'github',
        variant: 'dark',
      },
    ],
    techLogos: ['javascript', 'react', 'auth', 'vercel'],
    stack: ['React 18', 'React Router 6', 'Context API', 'Fetch API', 'Recharts', 'Vite', 'CSS'],
    featureIcons: ['auth', 'route', 'dashboard', 'chart', 'api', 'loading', 'logout'],
  },
] as const satisfies readonly ProjectBase[]

/** Slugs disponibles, dérivés de la base : un projet sans contenu casse le build. */
export type ProjectSlug = (typeof projectBases)[number]['slug']
