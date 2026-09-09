import type { Metadata } from 'next'
import SkillCategoryCard from '@/components/skills/SkillCategoryCard'
import SectionTitle from '@/components/ui/SectionTitle'
import Button from '@/components/ui/Button'
import { getDictionary, localizePath, resolveLocale } from '@/lib/i18n'
import { getSkills, skillCategories } from '@/lib/skills'
import { localeAlternates } from '@/lib/site'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const { metadata } = getDictionary(locale)

  return { ...metadata.about, alternates: localeAlternates('/about', locale) }
}

export default async function AboutPage({ params }: Props) {
  const locale = resolveLocale((await params).locale)
  const { about, cta } = getDictionary(locale)
  const skills = getSkills(locale)
  const { items } = about.background

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">

      {/* Titre + introduction */}
      <div className="mb-30">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-20">
          {about.title}<span className="text-accent">.</span>
        </h1>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed">
          {about.intro}
        </p>
      </div>

      {/* Section Compétences */}
      <section className="mb-30">
        <SectionTitle title={about.skills.title} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillCategories.map((category) => (
            <SkillCategoryCard
              key={category}
              title={about.skills.categories[category]}
              skills={skills.filter((s) => s.category === category)}
            />
          ))}
        </div>
      </section>

      {/* Section Parcours */}
      <section className="mb-35">
        <SectionTitle title={about.background.title} />
        <div className="space-y-0">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col sm:flex-row gap-2 sm:gap-10 py-10 ${
                index < items.length - 1 ? 'border-b border-white/5' : ''
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
            {about.method.title}
          </h2>
          <div className="space-y-4 mb-8">
            {about.method.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[#121212]/75 text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <Button
            label={cta.viewProjects}
            variant="dark"
            icon="arrowRight"
            href={localizePath('/projects', locale)}
          />
        </div>
      </section>

    </div>
  )
}
