import type { IconName, TechLogo } from '@/types/project'

export const iconMap: Record<IconName, string> = {
  github: '/icons/social/github.svg',
  linkedin: '/icons/social/linkedin.svg',
  arrowRight: '/icons/ui/arrow-right-light.svg',
  arrowLeft: '/icons/ui/arrow-left-light.svg',
  copy: '/icons/ui/copy.svg',
  menu: '/icons/ui/menu.svg',
  auth: '/icons/tech/auth.svg',
  api: '/icons/tech/api.svg',
  route: '/icons/features/route.svg',
  dashboard: '/icons/features/dashboard.svg',
  chart: '/icons/features/chart.svg',
  loading: '/icons/features/loading.svg',
  logout: '/icons/features/logout.svg',
  sync: '/icons/features/sync.svg',
  history: '/icons/features/history.svg',
  filter: '/icons/features/filter.svg',
  monitoring: '/icons/features/monitoring.svg',
  link: '/icons/features/link.svg',
}

export const techLogoMap: Record<TechLogo, string> = {
  javascript: '/icons/tech/javascript.svg',
  typescript: '/icons/tech/typescript.svg',
  react: '/icons/tech/react.svg',
  next: '/icons/tech/next.svg',
  node: '/icons/tech/node.svg',
  postgresql: '/icons/tech/postgresql.svg',
  supabase: '/icons/tech/supabase.svg',
  vercel: '/icons/tech/vercel.svg',
  figma: '/icons/tech/figma.svg',
  git: '/icons/tech/git.svg',
  github: '/icons/tech/github.svg',
  vitest: '/icons/tech/vitest.svg',
  agile: '/icons/tech/agile.svg',
  sdd: '/icons/tech/sdd.svg',
  auth: '/icons/tech/auth.svg',
}

export const socialIconMap: Record<'linkedin' | 'github', string> = {
  linkedin: '/icons/social/linkedin.svg',
  github: '/icons/social/github.svg',
}
