import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProjectImage from '@/components/projects/ProjectImage'
import TechLogoIcon from '@/components/ui/TechLogoIcon'
import SectionTitle from '@/components/ui/SectionTitle'
import IconBadge from '@/components/ui/IconBadge'
import ProjectDetailList from '@/components/projects/ProjectDetailList'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) notFound()

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">

      {/* Retour */}
      <div className="mb-14">
        <Button label="Retour aux projets" variant="dark" icon="arrowLeft" iconPosition="left" href="/projects" />
      </div>

      {/* Titre + description — 2 colonnes desktop */}
      <div className="grid md:grid-cols-[2fr_3fr] gap-8 md:gap-16 items-start mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white">
          {project.name}<span className="text-accent">.</span>
        </h1>
        <p className="text-text-secondary text-base md:text-lg leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Image */}
      <div className="mb-8 rounded-2xl overflow-hidden">
        <ProjectImage src={project.image} alt={project.name} />
      </div>

      {/* Liens + tags + logos */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-20">
        <div className="flex flex-wrap items-center gap-3">
          {project.links.map((link) => (
            <Button
              key={link.label}
              label={link.label}
              variant={link.variant}
              icon={link.icon}
              href={link.href}
            />
          ))}
          {project.tags.map((tag) => (
            <Badge key={tag} label={tag} variant="light" />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {project.techLogos.map((logo) => (
            <TechLogoIcon key={logo} name={logo} size={24} alt={logo} />
          ))}
        </div>
      </div>

      {/* Sections contenu */}
      <div className="space-y-16">

        <section>
          <SectionTitle title="Contexte" />
          <p className="text-text-secondary text-base leading-relaxed">{project.context}</p>
        </section>

        {/* Stack — card sombre */}
        <section>
          <div className="bg-surface border border-white/10 rounded-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start md:gap-12">
              <h2 className="font-heading text-xl font-semibold text-white mb-5 md:mb-0 md:w-40 shrink-0">
                Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Badge key={item} label={item} variant="light" />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle title="Choix techniques" />
          <ProjectDetailList items={project.technicalChoices} />
        </section>

        <section>
          <SectionTitle title="Fonctionnalités" />
          <div className="flex flex-wrap gap-2">
            {project.features.map((feature) => (
              <IconBadge key={feature.label} label={feature.label} icon={feature.icon} />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title="Ce que ce projet démontre" />
          <ProjectDetailList items={project.demonstrates} />
        </section>

        <section>
          <SectionTitle title="Limites actuelles" />
          <ProjectDetailList items={project.limits} />
        </section>

      </div>

      {/* CTA bas */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-20">
        <Button label="Retour aux projets" variant="dark" icon="arrowLeft" iconPosition="left" href="/projects" />
        <Button label="Me contacter" variant="primary" icon="arrowRight" href="/contact" />
      </div>

    </div>
  )
}
