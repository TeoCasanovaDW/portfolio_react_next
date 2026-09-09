import { notFound } from 'next/navigation'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProjectImage from '@/components/projects/ProjectImage'
import TechLogoIcon from '@/components/ui/TechLogoIcon'
import SectionTitle from '@/components/ui/SectionTitle'
import IconBadge from '@/components/ui/IconBadge'
import ProjectDetailList from '@/components/projects/ProjectDetailList'
import ProjectLinks from '@/components/projects/ProjectLinks'
import Icon from '@/components/ui/Icon'
import { getDictionary, localizePath, resolveLocale } from '@/lib/i18n'
import { getProject, projectSlugs } from '@/lib/projects'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

/** Un slug inconnu n'est pas rendu à la demande : il tombe sur la 404 globale du site. */
export const dynamicParams = false

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }))
}

export default async function ProjectPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params
  const locale = resolveLocale(rawLocale)
  const { cta, project: labels } = getDictionary(locale)
  const project = getProject(slug, locale)

  if (!project) notFound()

  const siteLink = project.links.find((link) => link.icon === 'link')

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">

      {/* Retour */}
      <div className="mb-14">
        <Button label={cta.backToProjects} variant="dark" icon="arrowLeft" iconPosition="left" href={localizePath('/projects', locale)} />
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
      <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)] ">
        {siteLink ? (
          <a
            href={siteLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block"
          >
            <ProjectImage src={project.image} alt={project.name} />
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 text-white text-sm font-medium opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              <Icon name={siteLink.icon ?? 'link'} size={16} alt="" />
              {siteLink.label}
            </div>
          </a>
        ) : (
          <ProjectImage src={project.image} alt={project.name} />
        )}
      </div>

      {/* Liens + tags + logos */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-20">
        <div className="flex flex-wrap items-center gap-3">
          <ProjectLinks links={project.links} />
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
          <SectionTitle title={labels.context} />
          <p className="text-text-secondary text-base leading-relaxed">{project.context}</p>
        </section>

        {/* Stack — card sombre */}
        <section>
          <div className="bg-surface border border-white/10 rounded-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start md:gap-12">
              <h2 className="font-heading text-xl font-semibold text-white mb-5 md:mb-0 md:w-40 shrink-0">
                {labels.stack}
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
          <SectionTitle title={labels.technicalChoices} />
          <ProjectDetailList items={project.technicalChoices} />
        </section>

        <section>
          <SectionTitle title={labels.features} />
          <div className="flex flex-wrap gap-2">
            {project.features.map((feature) => (
              <IconBadge key={feature.label} label={feature.label} icon={feature.icon} />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title={labels.demonstrates} />
          <ProjectDetailList items={project.demonstrates} />
        </section>

        <section>
          <SectionTitle title={labels.limits} />
          <ProjectDetailList items={project.limits} />
        </section>

      </div>

      {/* CTA bas */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-20">
        <Button label={cta.backToProjects} variant="dark" icon="arrowLeft" iconPosition="left" href={localizePath('/projects', locale)} />
        <Button label={cta.contactMe} variant="primary" icon="arrowRight" href={localizePath('/contact', locale)} />
      </div>

    </div>
  )
}
