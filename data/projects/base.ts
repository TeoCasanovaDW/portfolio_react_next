import type { ProjectBase } from '@/types/project'

/**
 * Technical base of the projects, shared by both languages.
 * The order of this array is the display order: Kasa stays in first position.
 */
export const projectBases = [
  {
    slug: 'kasa',
    name: 'Kasa',
    year: '2026',
    image: '/images/projects/kasa.png',
    links: [
      {
        href: 'https://kasa-lime-rho.vercel.app/',
        icon: 'link',
        variant: 'primary',
      },
      {
        href: 'https://github.com/TeoCasanovaDW/KASA',
        icon: 'github',
        variant: 'dark',
      },
    ],
    techLogos: ['next', 'typescript', 'react', 'node', 'auth', 'vitest', 'storybook', 'vercel'],
    stack: [
      { category: 'frontend', items: ['Next.js App Router', 'TypeScript', 'React', 'Tailwind CSS'] },
      { category: 'backend', items: ['Express', 'JWT'] },
      { category: 'database', items: ['SQLite'] },
      { category: 'testing', items: ['Vitest / RTL'] },
      { category: 'tools', items: ['Storybook'] },
      { category: 'deployment', items: ['Vercel', 'Railway', 'GitHub Actions'] },
    ],
    featureIcons: [
      'auth',
      'copyLight',
      'sendLight',
      'filter',
      'logout',
      'sync',
      'monitoring',
      'dashboard',
    ],
  },
  {
    slug: 'recallect',
    name: 'Recall’ect',
    year: '2026',
    image: '/images/projects/recallect.png',
    links: [],
    techLogos: [],
    stack: [
      { category: 'frontend', items: ['Vinext', 'React', 'TypeScript', 'Tailwind CSS v4'] },
      { category: 'backend', items: ['Cloudflare Workers', 'Cloudflare Workers AI'] },
      { category: 'database', items: ['Cloudflare D1'] },
      { category: 'deployment', items: ['Cloudflare Workers', 'PWA'] },
    ],
    featureIcons: ['route', 'sync', 'history', 'filter', 'dashboard'],
    media: {
      portraitVideo: {
        src: '/videos/recallect/ad-portrait.mp4',
        poster: '/videos/recallect/ad-portrait-poster.jpg',
        width: 1080,
        height: 1920,
      },
      landscapeVideo: {
        src: '/videos/recallect/ad-landscape.mp4',
        poster: '/videos/recallect/ad-landscape-poster.jpg',
        width: 1920,
        height: 1080,
      },
      storePanel: { src: '/images/projects/recallect/store-panel.jpg', width: 2580, height: 932 },
    },
  },
  {
    slug: 'abricot',
    name: 'Abricot',
    year: '2026',
    image: '/images/projects/abricot.png',
    links: [
      {
        href: 'https://github.com/TeoCasanovaDW/ABRICOT',
        icon: 'github',
        variant: 'dark',
      },
    ],
    techLogos: ['next', 'typescript', 'auth', 'mistral', 'docker', 'cypress'],
    stack: [
      { category: 'frontend', items: ['Next.js App Router', 'TypeScript', 'React', 'React Hook Form', 'Zod', 'CSS Modules'] },
      { category: 'backend', items: ['Express', 'Prisma', 'Mistral API'] },
      { category: 'database', items: ['PostgreSQL / Supabase'] },
      { category: 'testing', items: ['Vitest / RTL', 'Cypress'] },
      { category: 'deployment', items: ['Docker', 'GitHub Actions'] },
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
      { category: 'frontend', items: ['Next.js App Router', 'TypeScript', 'React', 'Tailwind CSS'] },
      { category: 'backend', items: ['Resend'] },
      { category: 'tools', items: ['Figma'] },
      { category: 'deployment', items: ['Vercel'] },
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
      { category: 'frontend', items: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'] },
      { category: 'backend', items: ['OpenRouter API', 'Vercel Cron'] },
      { category: 'database', items: ['Supabase PostgreSQL'] },
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
    stack: [
      { category: 'frontend', items: ['React 18', 'React Router 6', 'Context API', 'Fetch API', 'Recharts', 'CSS'] },
      { category: 'tools', items: ['Vite'] },
    ],
    featureIcons: ['auth', 'route', 'dashboard', 'chart', 'api', 'loading', 'logout'],
  },
] as const satisfies readonly ProjectBase[]

/** Available slugs, derived from the base: a project without content breaks the build. */
export type ProjectSlug = (typeof projectBases)[number]['slug']
