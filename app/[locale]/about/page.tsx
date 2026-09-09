import { skills } from '@/data/skills'
import type { SkillCategory } from '@/types/skill'
import SkillCategoryCard from '@/components/skills/SkillCategoryCard'
import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'

const categoryLabels: Record<SkillCategory, string> = {
  frontend: 'Front-end',
  backend: 'Back-end',
  tools: 'Outils',
  methodology: 'Méthodes de travail',
}

const categoryOrder: SkillCategory[] = ['frontend', 'backend', 'tools', 'methodology']

const parcours = [
  {
    id: 'revonum',
    period: '2022 - 2025',
    title: 'Développeur web full stack',
    company: 'Revonum',
    description:
      "Première expérience professionnelle en développement : alternance puis CDI. Travail sur une stack legacy, refonte e-commerce B2B, rédaction de spécifications, maquettes Figma et projets web.",
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
      "Montée en compétence sur une stack JavaScript moderne : React, Next.js, TypeScript, API, tests et déploiement.",
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">

      {/* Titre + introduction */}
      <div className="mb-30">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-20">
          A propos<span className="text-accent">.</span>
        </h1>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed">
          Après une première expérience professionnelle en développement, j&apos;ai choisi de
          consolider mon profil autour d&apos;une stack moderne pour travailler sur des applications
          web concrètes, structurées et maintenables.
        </p>
      </div>

      {/* Section Compétences */}
      <section className="mb-30">
        <SectionTitle title="Compétences" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryOrder.map((cat) => (
            <SkillCategoryCard
              key={cat}
              title={categoryLabels[cat]}
              skills={skills.filter((s) => s.category === cat)}
            />
          ))}
        </div>
      </section>

      {/* Section Parcours */}
      <section className="mb-35">
        <SectionTitle title="Parcours" />
        <div className="space-y-0">
          {parcours.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col sm:flex-row gap-2 sm:gap-10 py-10 ${
                index < parcours.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <div className="sm:w-36 flex-shrink-0 pt-0.5">
                <span className="text-sm font-medium text-accent">{item.period}</span>
              </div>
              <div>
                <p className="font-heading font-semibold text-white text-base leading-snug">
                  {item.title} — {item.company}
                </p>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bloc Méthode de travail */}
      <section>
        <div className="bg-accent rounded-2xl p-10 md:p-14">
          <h2 className="font-heading text-2xl font-semibold text-[#121212] mb-6">
            Méthode de travail
          </h2>
          <div className="space-y-4 mb-8">
            <p className="text-[#121212]/75 text-base leading-relaxed">
              J&apos;essaie de travailler avec une approche structurée : clarifier le besoin, écrire
              des spécifications simples, développer par étapes, puis vérifier la qualité avant mise
              en ligne.
            </p>
            <p className="text-[#121212]/75 text-base leading-relaxed">
              J&apos;utilise aussi l&apos;IA comme assistant de développement dans un cadre précis :
              cadrage, découpage des tâches, aide à l&apos;implémentation, revue de code et tests.
              L&apos;objectif est d&apos;accélérer le travail sans remplacer la réflexion technique.
            </p>
          </div>
          <Button label="Voir mes projets" variant="dark" icon="arrowRight" href="/projects" />
        </div>
      </section>

    </div>
  )
}
