import type { Dictionary } from '@/types/i18n'

/** Dictionnaire français — doit couvrir exactement les clés de `en.ts`. */
export const fr: Dictionary = {
  metadata: {
    home: {
      title: 'Téo Casanova | Développeur React & Next.js',
      description:
        'Portfolio de Téo Casanova, développeur JavaScript / TypeScript orienté React et Next.js.',
    },
    about: {
      title: 'À propos | Téo Casanova',
      description:
        'Parcours, compétences et méthode de travail de Téo Casanova, développeur React et Next.js.',
    },
    projects: {
      title: 'Projets | Téo Casanova',
      description:
        'Sélection de projets web développés avec React, Next.js, TypeScript, API et données.',
    },
    contact: {
      title: 'Contact | Téo Casanova',
      description:
        "Contacter Téo Casanova à propos d'une opportunité, d'un projet ou de son profil.",
    },
    project: {
      title: '{name} | Téo Casanova',
    },
    notFound: {
      title: 'Page introuvable | Téo Casanova',
      description: "Cette page n'existe pas ou a été déplacée.",
    },
  },

  nav: {
    home: 'Accueil',
    about: 'À propos',
    projects: 'Projets',
    contact: 'Contact',
    mainLabel: 'Navigation principale',
    mobileLabel: 'Navigation mobile',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    languageLabel: 'Choix de la langue',
  },

  cta: {
    viewProjects: 'Voir mes projets',
    contactMe: 'Me contacter',
    backToProjects: 'Retour aux projets',
    backHome: "Retour à l'accueil",
  },

  home: {
    titleStart: 'Développeur React',
    titleEnd: 'Next.js',
    paragraphs: [
      "Je conçois des applications web modernes avec une attention particulière portée à la qualité du code, à l'architecture et à l'expérience utilisateur. Curieux de nature, je m'intéresse également aux outils d'IA, à l'automatisation et aux méthodes qui permettent de développer plus efficacement.",
      "J'apprécie particulièrement les projets qui combinent réflexion technique, résolution de problèmes et création d'interfaces claires et intuitives. Mon objectif est de construire des solutions fiables, maintenables et adaptées aux besoins réels des utilisateurs.",
    ],
  },

  about: {
    title: 'A propos',
    intro:
      "Après une première expérience professionnelle en développement, j'ai choisi de consolider mon profil autour d'une stack moderne pour travailler sur des applications web concrètes, structurées et maintenables.",
    skills: {
      title: 'Compétences',
      categories: {
        frontend: 'Front-end',
        backend: 'Back-end',
        tools: 'Outils',
        methodology: 'Méthodes de travail',
      },
    },
    background: {
      title: 'Parcours',
      items: [
        {
          id: 'revonum',
          period: '2022 - 2025',
          title: 'Développeur web full stack',
          company: 'Revonum',
          description:
            'Première expérience professionnelle en développement : alternance puis CDI. Travail sur une stack legacy, refonte e-commerce B2B, rédaction de spécifications, maquettes Figma et projets web.',
        },
        {
          id: 'cesi',
          period: '2023 - 2024',
          title: "Bachelor Concepteur Développeur d'Applications",
          company: 'CESI',
          description:
            "Formation orientée conception, développement d'applications web et desktop, bases de données, UML et architecture applicative.",
        },
        {
          id: 'oc',
          period: '2026',
          title: 'Formation React / Next.js',
          company: 'OpenClassrooms',
          description:
            'Montée en compétence sur une stack JavaScript moderne : React, Next.js, TypeScript, API, tests et déploiement.',
        },
      ],
    },
    method: {
      title: 'Méthode de travail',
      paragraphs: [
        "J'essaie de travailler avec une approche structurée : clarifier le besoin, écrire des spécifications simples, développer par étapes, puis vérifier la qualité avant mise en ligne.",
        "J'utilise aussi l'IA comme assistant de développement dans un cadre précis : cadrage, découpage des tâches, aide à l'implémentation, revue de code et tests. L'objectif est d'accélérer le travail sans remplacer la réflexion technique.",
      ],
    },
  },

  projects: {
    title: 'Projets',
    paragraphs: [
      'Voici une sélection de projets alignés avec mon objectif actuel : concevoir et développer des applications web modernes avec React, Next.js, TypeScript, API et données.',
      "Ces projets ne représentent pas l'ensemble de mon parcours. J'ai également travaillé sur d'autres projets web, notamment sur des stacks plus anciennes ou différentes, mais j'ai choisi de mettre ici en avant ceux qui reflètent le mieux mon positionnement actuel.",
    ],
  },

  project: {
    context: 'Contexte',
    stack: 'Stack',
    technicalChoices: 'Choix techniques',
    features: 'Fonctionnalités',
    demonstrates: 'Ce que ce projet démontre',
    limits: 'Limites actuelles',
  },

  contact: {
    title: 'Contact',
    intro: "Vous souhaitez échanger à propos d'une opportunité, d'un projet ou de mon profil ?",
    separator: 'Ou',
    copyEmail: "Copier l'adresse email",
    copied: 'Copié !',
    form: {
      name: 'Nom',
      namePlaceholder: 'Votre nom',
      email: 'Email',
      emailPlaceholder: 'votre@email.com',
      message: 'Message',
      messagePlaceholder: 'Votre message...',
      submit: 'Envoyer',
      submitting: 'Envoi en cours…',
      successTitle: 'Message envoyé !',
      successMessage: 'Je vous répondrai dans les plus brefs délais.',
      errors: {
        name: 'Le nom est requis (100 caractères max).',
        email: 'Adresse email invalide.',
        message: 'Le message doit contenir entre 10 et 2000 caractères.',
        generic: 'Une erreur est survenue.',
        retry: 'Une erreur est survenue. Veuillez réessayer.',
      },
    },
    api: {
      invalidRequest: 'Requête invalide.',
      invalidName: 'Nom invalide.',
      invalidEmail: 'Email invalide.',
      invalidMessage: 'Message invalide.',
      missingConfiguration: 'Configuration manquante.',
      sendFailed: "Erreur lors de l'envoi.",
    },
  },

  notFound: {
    code: 'Erreur 404',
    title: 'Page introuvable',
    description: "Cette page n'existe pas ou a été déplacée.",
  },
}
