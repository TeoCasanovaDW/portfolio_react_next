import type { ProjectSlug } from './base'
import type { ProjectContent } from '@/types/project'

/**
 * Contenus projets en anglais.
 * `linkLabels` et `featureLabels` suivent l'ordre déclaré dans `base.ts`.
 */
export const enProjects: Record<ProjectSlug, ProjectContent> = {
  kasa: {
    type: 'Next.js web app / Housing rental platform',
    shortDescription:
      'Full-stack peer-to-peer rental platform with authentication, favorites, messaging, listing creation and account management.',
    description:
      'Next.js rental application to browse and publish housing listings, keep favorites, talk to owners and manage an account, through a responsive interface connected to an Express API.',
    tags: ['Full-Stack', 'Next.js', 'Marketplace'],
    linkLabels: ['View site', 'GitHub'],
    context:
      'Project built as part of the OpenClassrooms program, then taken further than its original scope. The goal was to build a complete rental application from mockups, integrating an existing Express API before adapting it to the feature and deployment needs.',
    technicalChoices: [
      'Next.js App Router with Server Components for server-side rendering, and client components only where interaction is required',
      'Server Actions to centralize sensitive writes without exposing the Express API directly to the browser',
      'Express API with JWT authentication and client, owner and admin roles',
      'SQLite to persist accounts, properties, messages and business data',
      'Upload handling for property photos and user avatars',
      'Context API and localStorage to manage favorites without adding backend complexity',
      'Vitest and React Testing Library to cover critical behaviors and components',
      'Vercel for the Next.js frontend and Railway with a persistent volume for the backend, SQLite and uploads',
    ],
    featureLabels: [
      'JWT authentication',
      'Listing creation',
      'Messaging',
      'Favorites',
      'Profile management',
      'Image uploads',
      'SEO & accessibility',
      'Responsive design',
    ],
    demonstrates: [
      'Building a full-stack Next.js application connected to an Express API',
      'Handling authentication, roles and protected routes',
      'Designing Server Actions to secure exchanges with the backend',
      'Implementing user-to-user messaging',
      'Complete handling of forms, validation and file uploads',
      'Building accessible, responsive interfaces from provided mockups',
      'Setting up automated tests on critical flows and logic',
      'Deploying a separate frontend and backend architecture with persistent storage',
    ],
    limits: [
      'Backend initially provided, then extended for the needs of the project and its deployment',
      'SQLite suited to the demo and scope of this project rather than to heavy production load',
      'Uploads go through Server Actions and remain subject to Vercel’s 4.5 MB request body limit',
    ],
  },
  abricot: {
    type: 'Next.js web app / Project management SaaS',
    shortDescription:
      'Collaborative app to manage projects, tasks and contributors, and to generate tasks with AI assistance.',
    description:
      'Next.js project management app to create projects, organize tasks, manage contributors and generate task drafts with Mistral.',
    tags: ['Full-Stack', 'SaaS', 'AI'],
    linkLabels: ['GitHub'],
    context:
      'Project built as part of the OpenClassrooms program. The goal was to develop the frontend of a collaborative SaaS on top of an existing Express API, then improve its technical environment and quality.',
    technicalChoices: [
      'Next.js App Router to separate server-side loading from client-side interactions',
      'Route Handlers to secure exchanges between the browser and the Express API',
      'React Hook Form and Zod to handle and validate forms',
      'Prisma and Supabase PostgreSQL to provide remote data persistence',
      'Mistral on the server to generate task drafts validated before creation',
      'Docker to containerize the backend and make its runtime environment reliable',
      'Vitest, RTL and Cypress to cover business behaviors and critical user flows',
      'GitHub Actions to automate lint, typecheck, tests and builds',
    ],
    featureLabels: [
      'Project management',
      'Task management',
      'Contributors',
      'List / Kanban view',
      'AI generation',
      'JWT authentication',
      'Responsive interface',
    ],
    demonstrates: [
      'Building a complete Next.js frontend connected to an Express API',
      'Handling complex forms with React Hook Form and Zod',
      'Secure integration of an LLM with validation of its responses',
      'Migration from SQLite to Supabase PostgreSQL with Prisma',
      'Containerization of a Node backend with Docker',
      'Setting up unit, component and end-to-end tests',
      'Automation of quality checks with GitHub Actions',
    ],
    limits: [
      'Backend initially provided, then adapted for PostgreSQL and deployment',
      'AI task creation performed sequentially, without a bulk creation endpoint',
      'Test coverage deliberately focused on critical flows and logic',
    ],
  },

  portfolio: {
    type: 'Next.js web app / Developer portfolio',
    shortDescription:
      'Personal portfolio built to present my profile, my projects and my positioning as a React / Next.js developer.',
    description:
      'Next.js application built to present my background, my skills and my projects through a responsive, understated and maintainable interface.',
    tags: ['Front-End', 'Next.js', 'Portfolio'],
    linkLabels: ['GitHub'],
    context:
      'Personal project built to create a portfolio consistent with my professional goal: working as a React / Next.js developer on modern web applications.',
    technicalChoices: [
      'Next.js App Router to structure pages and navigation',
      'TypeScript to type the portfolio data',
      'Tailwind CSS to build a responsive interface faithful to the mockups',
      'Local typed data to manage projects, skills and links',
      'Resend to make the contact form functional',
    ],
    featureLabels: [
      'Responsive design',
      'Dynamic pages',
      'Typed data',
      'Contact form',
      'Copyable email',
    ],
    demonstrates: [
      'End-to-end design of a developer portfolio',
      'Turning Figma mockups into a responsive interface',
      'Structuring a maintainable Next.js application',
      'Reuse of consistent UI components',
      'Building a functional contact form with Resend',
    ],
    limits: [
      'Content managed manually in TypeScript files',
      'No CMS or back office',
      'No light mode in V1',
    ],
  },

  'ai-model-radar': {
    type: 'Next.js web app / AI data dashboard',
    shortDescription:
      'Data app to centralize, track over time and compare the AI models available through OpenRouter.',
    description:
      'Next.js application to synchronize OpenRouter models, store them in Supabase and follow their evolution through a dashboard, filters and charts.',
    tags: ['Full-Stack', 'Data', 'API'],
    linkLabels: ['GitHub'],
    context:
      'Portfolio project aiming to build a complete data application around the OpenRouter AI models, with automated synchronization, history and an exploration interface.',
    technicalChoices: [
      'Next.js App Router to structure pages and navigation',
      'Supabase PostgreSQL to store models, snapshots and synchronization runs',
      'OpenRouter API as the external data source',
      'Vercel Cron to automate the daily synchronization',
      'TypeScript to make data handling more reliable',
    ],
    featureLabels: [
      'Scheduled daily sync',
      'Historical snapshots',
      'Search and filters',
      'Model detail pages',
      'Data dashboard',
      'Evolution charts',
      'Persistent filters',
    ],
    demonstrates: [
      'Full-stack development with Next.js and TypeScript',
      'Integration of a third-party API with data normalization',
      'Modeling of a PostgreSQL database with Supabase',
      'Automation of synchronizations with Vercel Cron',
      'Data visualization in a clear and maintainable interface',
    ],
    limits: [
      'Dependency on the data provided by OpenRouter',
      'History still limited because the project is recent',
      'No collaborative or real-time features',
    ],
  },

  sportsee: {
    type: 'React web app / Fitness dashboard',
    shortDescription:
      'React fitness dashboard connected to a local API, with authentication, protected routes and dynamic charts.',
    description:
      'React fitness dashboard application that lets a user consult their profile, their performance and their statistics through a dynamic interface connected to a local API.',
    tags: ['Front-End', 'API', 'Auth'],
    linkLabels: ['GitHub'],
    context:
      'Project built as part of the OpenClassrooms program. The goal was to turn an existing HTML/CSS mockup into a working React application, with JWT authentication, protected routes and dynamic data.',
    technicalChoices: [
      'Clear architecture separating components, pages, services, hooks and contexts',
      'Context API to centralize the information related to the logged-in user',
      'React Router to handle navigation and protected routes',
      'Fetch API to retrieve data from the local API',
      'Recharts to display sports statistics as dynamic charts',
    ],
    featureLabels: [
      'JWT authentication',
      'Protected routes',
      'Personalized dashboard',
      'Dynamic charts',
      'API calls',
      'Loading/error states',
      'Logout',
    ],
    demonstrates: [
      'Integration of an existing mockup into a structured React application',
      'Handling of authentication and protected routes',
      'Consumption of a local API with the Fetch API',
      'Display of dynamic data as charts',
      'Maintainable organization across components, services, hooks and contexts',
    ],
    limits: [
      'Local API only',
      'Some data remains static because it is not provided by the backend',
      'No automated tests yet',
      'Project mainly focused on integration and frontend logic',
    ],
  },
}
