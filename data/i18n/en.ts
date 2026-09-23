/**
 * English dictionary — source of truth for the `Dictionary` type.
 * Every key added here must also be added to `fr.ts`, otherwise the build fails.
 */
export const en = {
  metadata: {
    home: {
      title: 'Téo Casanova | React & Next.js Developer',
      description:
        'Portfolio of Téo Casanova, a JavaScript / TypeScript developer focused on React and Next.js.',
    },
    about: {
      title: 'About | Téo Casanova',
      description:
        'Background, skills and working methods of Téo Casanova, a React and Next.js developer.',
    },
    projects: {
      title: 'Projects | Téo Casanova',
      description:
        'A selection of web projects built with React, Next.js, TypeScript, APIs and data.',
    },
    contact: {
      title: 'Contact | Téo Casanova',
      description: 'Get in touch with Téo Casanova about an opportunity, a project or his profile.',
    },
    /** Project detail page: `{name}` is replaced with the project name. */
    project: {
      title: '{name} | Téo Casanova',
    },
    notFound: {
      title: 'Page not found | Téo Casanova',
      description: 'This page does not exist or has been moved.',
    },
  },

  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    contact: 'Contact',
    mainLabel: 'Main navigation',
    mobileLabel: 'Mobile navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    languageLabel: 'Language',
  },

  cta: {
    viewProjects: 'View my projects',
    contactMe: 'Get in touch',
    backToProjects: 'Back to projects',
    backToBlog: 'Back to blog',
    backHome: 'Back to home',
  },

  home: {
    titleStart: 'React',
    titleEnd: 'Next.js Developer',
    paragraphs: [
      'I build modern web applications with a strong focus on code quality, architecture and user experience. Naturally curious, I also follow AI tools, automation and the methods that make development more efficient.',
      'I especially enjoy projects that combine technical thinking, problem solving and the design of clear, intuitive interfaces. My goal is to build reliable, maintainable solutions that fit real user needs.',
    ],
  },

  about: {
    title: 'About',
    intro:
      'After a first professional experience in development, I chose to strengthen my profile around a modern stack, in order to work on real web applications that are well structured and maintainable.',
    skills: {
      title: 'Skills',
      categories: {
        frontend: 'Front-end',
        backend: 'Back-end',
        tools: 'Tools',
        methodology: 'Working methods',
      },
    },
    background: {
      title: 'Background',
      items: [
        {
          id: 'revonum',
          period: '2022 - 2025',
          title: 'Full-stack web developer',
          company: 'Revonum',
          description:
            'First professional experience in development: apprenticeship, then a permanent contract. Work on a legacy stack, a B2B e-commerce redesign, writing specifications, Figma mockups and web projects.',
        },
        {
          id: 'cesi',
          period: '2023 - 2024',
          title: "Bachelor's degree in application design and development",
          company: 'CESI',
          description:
            'Program focused on software design, web and desktop application development, databases, UML and application architecture.',
        },
        {
          id: 'oc',
          period: '2026',
          title: 'React / Next.js training program',
          company: 'OpenClassrooms',
          description:
            'Building up skills on a modern JavaScript stack: React, Next.js, TypeScript, APIs, testing and deployment.',
        },
      ],
    },
    method: {
      title: 'How I work',
      paragraphs: [
        'I try to work with a structured approach: clarify the need, write simple specifications, build step by step, then check quality before going live.',
        'I also use AI as a development assistant within a defined scope: framing, task breakdown, implementation support, code review and testing. The goal is to move faster without replacing technical thinking.',
      ],
    },
  },

  projects: {
    title: 'Projects',
    workInProgress: 'Work in Progress',
    paragraphs: [
      'Here is a selection of projects aligned with my current goal: designing and building modern web applications with React, Next.js, TypeScript, APIs and data.',
      'These projects do not cover my whole background. I have also worked on other web projects, in particular on older or different stacks, but I chose to highlight the ones that best reflect where I stand today.',
    ],
  },

  project: {
    context: 'Context',
    stack: 'Stack',
    technicalChoices: 'Technical choices',
    features: 'Features',
    demonstrates: 'What this project demonstrates',
    limits: 'Current limitations',
  },

  blog: {
    title: 'Blog',
    paragraphs: [
      'Notes on the tools, patterns and decisions I rely on when building with React, Next.js and TypeScript.',
      'A space to think through the trade-offs behind my projects, rather than a general tech blog.',
    ],
    /** `{minutes}` is replaced with the reading time of the article. */
    readingTime: '{minutes} min read',
    filterLabel: 'Filter articles by tag',
    allTags: 'All articles',
    emptyState: 'No articles for this tag yet.',
  },

  contact: {
    title: 'Contact',
    intro: 'Would you like to talk about an opportunity, a project or my profile?',
    separator: 'Or',
    copyEmail: 'Copy email address',
    copied: 'Copied!',
    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      message: 'Message',
      messagePlaceholder: 'Your message...',
      submit: 'Send',
      submitting: 'Sending…',
      successTitle: 'Message sent!',
      successMessage: 'I will get back to you as soon as possible.',
      errors: {
        name: 'Name is required (100 characters max).',
        email: 'Invalid email address.',
        message: 'Message must be between 10 and 2000 characters.',
        generic: 'Something went wrong.',
        retry: 'Something went wrong. Please try again.',
      },
    },
    api: {
      invalidRequest: 'Invalid request.',
      invalidName: 'Invalid name.',
      invalidEmail: 'Invalid email.',
      invalidMessage: 'Invalid message.',
      missingConfiguration: 'Missing configuration.',
      sendFailed: 'The message could not be sent.',
    },
  },

  notFound: {
    code: 'Error 404',
    title: 'Page not found',
    description: 'This page does not exist or has been moved.',
  },
}
