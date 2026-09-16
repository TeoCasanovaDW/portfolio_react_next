import type { ProjectSlug } from './base'
import type { ProjectContent } from '@/types/project'

/**
 * Contenus projets en français, repris du contenu existant.
 * `linkLabels` et `featureLabels` suivent l'ordre déclaré dans `base.ts`.
 */
export const frProjects: Record<ProjectSlug, ProjectContent> = {
  kasa: {
    type: 'Application web Next.js / Plateforme de location de logements',
    shortDescription:
      'Plateforme full-stack de location entre particuliers avec authentification, favoris, messagerie, création d’annonces et gestion de compte.',
    description:
      'Application Next.js de location de logements permettant de consulter et publier des annonces, gérer ses favoris, échanger avec les propriétaires et administrer son compte à travers une interface responsive connectée à une API Express.',
    tags: ['Full-Stack', 'Next.js', 'Marketplace'],
    linkLabels: ['Voir le site', 'GitHub'],
    context:
      "Projet réalisé dans le cadre du parcours OpenClassrooms puis approfondi au-delà du périmètre initial. L’objectif était de construire une application de location complète à partir de maquettes, en intégrant une API Express existante puis en l’adaptant pour les besoins fonctionnels et le déploiement.",
    technicalChoices: [
      'Next.js App Router avec Server Components pour le rendu serveur et composants clients uniquement pour les interactions',
      'Server Actions pour centraliser les écritures sensibles sans exposer directement l’API Express au navigateur',
      'API Express avec authentification JWT et gestion des rôles client, propriétaire et administrateur',
      'SQLite pour la persistance des comptes, logements, messages et données métier',
      'Système d’upload pour les photos de logements et les avatars utilisateurs',
      'Context API et localStorage pour gérer les favoris sans complexifier le backend',
      'Vitest et React Testing Library pour couvrir les comportements et composants critiques',
      'Netlify pour le frontend Next.js et Railway avec volume persistant pour le backend, SQLite et les uploads',
    ],
    featureLabels: [
      'Authentification JWT',
      'Création d’annonces',
      'Messagerie',
      'Favoris',
      'Gestion du profil',
      'Uploads d’images',
      'SEO & accessibilité',
      'Responsive design',
    ],
    demonstrates: [
      'Développement d’une application full-stack Next.js connectée à une API Express',
      'Gestion de l’authentification, des rôles et des routes protégées',
      'Conception de Server Actions pour sécuriser les échanges avec le backend',
      'Mise en place d’une messagerie entre utilisateurs',
      'Gestion complète de formulaires, validations et uploads de fichiers',
      'Création d’interfaces accessibles et responsive à partir de maquettes',
      'Mise en place de tests automatisés sur les parcours et logiques critiques',
      'Déploiement d’une architecture frontend et backend séparée avec stockage persistant',
    ],
    limits: [
      'Backend initialement fourni puis étendu pour les besoins du projet et du déploiement',
      'Base SQLite adaptée à la démonstration et au périmètre du projet plutôt qu’à une forte montée en charge',
      'Les uploads transitent par les Server Actions et restent soumis aux limites de taille de la plateforme Netlify',
    ],
  },
  abricot: {
    type: 'Application web Next.js / SaaS de gestion de projet',
    shortDescription:
      'Application collaborative pour gérer des projets, des tâches, des contributeurs et générer des tâches avec l’aide de l’IA.',
    description:
      'Application Next.js de gestion de projet permettant de créer des projets, organiser les tâches, gérer les contributeurs et générer des brouillons de tâches avec Mistral.',
    tags: ['Full-Stack', 'SaaS', 'IA'],
    linkLabels: ['GitHub'],
    context:
      "Projet réalisé dans le cadre du parcours OpenClassrooms. L'objectif était de développer le frontend d'un SaaS collaboratif à partir d'une API Express existante, puis d'en améliorer l'environnement technique et la qualité.",
    technicalChoices: [
      'Next.js App Router pour séparer le chargement serveur des interactions côté client',
      'Route Handlers pour sécuriser les échanges entre le navigateur et l’API Express',
      'React Hook Form et Zod pour gérer et valider les formulaires',
      'Prisma et PostgreSQL Supabase pour assurer une persistance distante des données',
      'Mistral côté serveur pour générer des brouillons de tâches validés avant création',
      'Docker pour conteneuriser le backend et fiabiliser son environnement d’exécution',
      'Vitest, RTL et Cypress pour couvrir les comportements métier et parcours critiques',
      'GitHub Actions pour automatiser lint, typecheck, tests et builds',
    ],
    featureLabels: [
      'Gestion des projets',
      'Gestion des tâches',
      'Contributeurs',
      'Vue Liste / Kanban',
      'Génération par IA',
      'Authentification JWT',
      'Interface responsive',
    ],
    demonstrates: [
      "Développement d'un frontend Next.js complet connecté à une API Express",
      'Gestion de formulaires complexes avec React Hook Form et Zod',
      'Intégration sécurisée d’un LLM avec validation des réponses',
      'Migration de SQLite vers PostgreSQL Supabase avec Prisma',
      'Conteneurisation d’un backend Node avec Docker',
      'Mise en place de tests unitaires, composants et E2E',
      'Automatisation des contrôles qualité avec GitHub Actions',
    ],
    limits: [
      'Backend initialement fourni puis adapté pour PostgreSQL et le déploiement',
      'Création des tâches IA réalisée séquentiellement sans endpoint de création en masse',
      'Couverture de tests volontairement ciblée sur les parcours et logiques critiques',
    ],
  },

  portfolio: {
    type: 'Application web Next.js / Portfolio développeur',
    shortDescription:
      'Portfolio personnel conçu pour présenter mon profil, mes projets et mon positionnement de développeur React / Next.js.',
    description:
      'Application Next.js développée pour présenter mon parcours, mes compétences et mes projets à travers une interface responsive, sobre et maintenable.',
    tags: ['Front-End', 'Next.js', 'Portfolio'],
    linkLabels: ['GitHub'],
    context:
      'Projet personnel réalisé pour construire un portfolio cohérent avec mon objectif professionnel : devenir développeur React / Next.js sur des applications web modernes.',
    technicalChoices: [
      'Next.js App Router pour structurer les pages et la navigation',
      'TypeScript pour typer les données du portfolio',
      'Tailwind CSS pour construire une interface responsive fidèle aux maquettes',
      'Données locales typées pour gérer les projets, compétences et liens',
      'Resend pour rendre le formulaire de contact fonctionnel',
    ],
    featureLabels: [
      'Design responsive',
      'Pages dynamiques',
      'Données typées',
      'Formulaire contact',
      'Email copiable',
    ],
    demonstrates: [
      'Conception complète d’un portfolio de développeur',
      'Traduction de maquettes Figma en interface responsive',
      'Structuration d’une application Next.js maintenable',
      'Réutilisation de composants UI cohérents',
      'Mise en place d’un formulaire de contact fonctionnel avec Resend',
    ],
    limits: [
      'Contenu administré manuellement dans des fichiers TypeScript',
      'Pas de CMS ou back-office',
      'Pas de light mode en V1',
    ],
  },

  'ai-model-radar': {
    type: 'Application web Next.js / Dashboard data IA',
    shortDescription:
      'Application data pour centraliser, historiser et comparer les modèles IA disponibles via OpenRouter.',
    description:
      'Application Next.js permettant de synchroniser les modèles OpenRouter, les stocker dans Supabase et suivre leur évolution via un dashboard, des filtres et des graphiques.',
    tags: ['Full-Stack', 'Data', 'API'],
    linkLabels: ['GitHub'],
    context:
      "Projet portfolio visant à construire une application data complète autour des modèles IA d'OpenRouter, avec synchronisation automatique, historique et interface d'exploration.",
    technicalChoices: [
      'Next.js App Router pour structurer les pages et la navigation',
      'Supabase PostgreSQL pour stocker les modèles, snapshots et runs de synchronisation',
      'OpenRouter API comme source de données externe',
      'Vercel Cron pour automatiser la synchronisation quotidienne',
      'TypeScript pour fiabiliser la manipulation des données',
    ],
    featureLabels: [
      'Sync quotidienne',
      'Snapshots historiques',
      'Recherche et filtres',
      'Pages détail modèle',
      'Dashboard data',
      "Graphiques d'évolution",
      'Filtres persistants',
    ],
    demonstrates: [
      'Développement full-stack avec Next.js et TypeScript',
      "Intégration d'une API tierce avec normalisation des données",
      "Modélisation d'une base PostgreSQL avec Supabase",
      'Automatisation de synchronisations avec Vercel Cron',
      'Visualisation de données dans une interface claire et maintenable',
    ],
    limits: [
      'Dépendance aux données fournies par OpenRouter',
      'Historique encore limité car le projet est récent',
      'Pas de fonctionnalités collaboratives ou temps réel',
    ],
  },

  sportsee: {
    type: 'Application web React / Dashboard sportif',
    shortDescription:
      'Application React de dashboard sportif connectée à une API locale avec authentification, routes protégées et graphiques dynamiques.',
    description:
      'Application React de dashboard sportif permettant à un utilisateur de consulter son profil, ses performances et ses statistiques à travers une interface dynamique connectée à une API locale.',
    tags: ['Front-End', 'API', 'Auth'],
    linkLabels: ['GitHub'],
    context:
      "Projet réalisé dans le cadre du parcours OpenClassrooms. L'objectif était de transformer une maquette HTML/CSS existante en application React fonctionnelle, avec authentification JWT, routes protégées et données dynamiques.",
    technicalChoices: [
      'Architecture claire avec séparation des composants, pages, services, hooks et contextes',
      "Context API pour centraliser les informations liées à l'utilisateur connecté",
      'React Router pour gérer la navigation et les routes protégées',
      "Fetch API pour récupérer les données depuis l'API locale",
      'Recharts pour afficher les statistiques sportives sous forme de graphiques dynamiques',
    ],
    featureLabels: [
      'Authentification JWT',
      'Routes protégées',
      'Dashboard personnalisé',
      'Graphiques dynamiques',
      'Appels API',
      'États loading/error',
      'Déconnexion',
    ],
    demonstrates: [
      "Intégration d'une maquette existante dans une application React structurée",
      "Gestion de l'authentification et des routes protégées",
      "Consommation d'une API locale avec Fetch API",
      'Affichage de données dynamiques sous forme de graphiques',
      'Organisation maintenable entre composants, services, hooks et contextes',
    ],
    limits: [
      'API uniquement locale',
      'Certaines données restent statiques car non fournies par le back-end',
      'Pas encore de tests automatisés',
      "Projet principalement centré sur l'intégration et la logique front-end",
    ],
  },
}
