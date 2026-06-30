import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    slug: 'ai-model-radar',
    name: 'AI Model Radar',
    year: '2026',
    type: 'Application web Next.js / Dashboard data IA',
    shortDescription:
      'Application data pour centraliser, historiser et comparer les modèles IA disponibles via OpenRouter.',
    description:
      'Application Next.js permettant de synchroniser les modèles OpenRouter, les stocker dans Supabase et suivre leur évolution via un dashboard, des filtres et des graphiques.',
    image: '/images/projects/ai-model-radar.png',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/TeoCasanovaDW/ai-radar',
        icon: 'github',
        variant: 'dark',
      },
    ],
    tags: ['Full-Stack', 'Data', 'API'],
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
    context:
      'Projet portfolio visant à construire une application data complète autour des modèles IA d\'OpenRouter, avec synchronisation automatique, historique et interface d\'exploration.',
    technicalChoices: [
      'Next.js App Router pour structurer les pages et la navigation',
      'Supabase PostgreSQL pour stocker les modèles, snapshots et runs de synchronisation',
      'OpenRouter API comme source de données externe',
      'Vercel Cron pour automatiser la synchronisation quotidienne',
      'TypeScript pour fiabiliser la manipulation des données',
    ],
    features: [
      { label: 'Sync quotidienne', icon: 'sync' },
      { label: 'Snapshots historiques', icon: 'history' },
      { label: 'Recherche et filtres', icon: 'filter' },
      { label: 'Pages détail modèle', icon: 'route' },
      { label: 'Dashboard data', icon: 'dashboard' },
      { label: 'Graphiques d\'évolution', icon: 'monitoring' },
      { label: 'Filtres persistants', icon: 'link' },
    ],
    demonstrates: [
      'Développement full-stack avec Next.js et TypeScript',
      'Intégration d\'une API tierce avec normalisation des données',
      'Modélisation d\'une base PostgreSQL avec Supabase',
      'Automatisation de synchronisations avec Vercel Cron',
      'Visualisation de données dans une interface claire et maintenable',
    ],
    limits: [
      'Dépendance aux données fournies par OpenRouter',
      'Historique encore limité car le projet est récent',
      'Pas de fonctionnalités collaboratives ou temps réel',
    ],
  },
  {
    slug: 'sportsee',
    name: 'SportSee',
    year: '2026',
    type: 'Application web React / Dashboard sportif',
    shortDescription:
      'Application React de dashboard sportif connectée à une API locale avec authentification, routes protégées et graphiques dynamiques.',
    description:
      'Application React de dashboard sportif permettant à un utilisateur de consulter son profil, ses performances et ses statistiques à travers une interface dynamique connectée à une API locale.',
    image: '/images/projects/sportsee.png',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/TeoCasanovaDW/sportsee',
        icon: 'github',
        variant: 'dark',
      },
    ],
    tags: ['Front-End', 'API', 'Auth'],
    techLogos: ['javascript', 'react', 'auth', 'vercel'],
    stack: ['React 18', 'React Router 6', 'Context API', 'Fetch API', 'Recharts', 'Vite', 'CSS'],
    context:
      'Projet réalisé dans le cadre du parcours OpenClassrooms. L\'objectif était de transformer une maquette HTML/CSS existante en application React fonctionnelle, avec authentification JWT, routes protégées et données dynamiques.',
    technicalChoices: [
      'Architecture claire avec séparation des composants, pages, services, hooks et contextes',
      'Context API pour centraliser les informations liées à l\'utilisateur connecté',
      'React Router pour gérer la navigation et les routes protégées',
      'Fetch API pour récupérer les données depuis l\'API locale',
      'Recharts pour afficher les statistiques sportives sous forme de graphiques dynamiques',
    ],
    features: [
      { label: 'Authentification JWT', icon: 'auth' },
      { label: 'Routes protégées', icon: 'route' },
      { label: 'Dashboard personnalisé', icon: 'dashboard' },
      { label: 'Graphiques dynamiques', icon: 'chart' },
      { label: 'Appels API', icon: 'api' },
      { label: 'États loading/error', icon: 'loading' },
      { label: 'Déconnexion', icon: 'logout' },
    ],
    demonstrates: [
      'Intégration d\'une maquette existante dans une application React structurée',
      'Gestion de l\'authentification et des routes protégées',
      'Consommation d\'une API locale avec Fetch API',
      'Affichage de données dynamiques sous forme de graphiques',
      'Organisation maintenable entre composants, services, hooks et contextes',
    ],
    limits: [
      'API uniquement locale',
      'Certaines données restent statiques car non fournies par le back-end',
      'Pas encore de tests automatisés',
      'Projet principalement centré sur l\'intégration et la logique front-end',
    ],
  },
]
