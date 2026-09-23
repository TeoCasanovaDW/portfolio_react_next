import type { Metadata } from 'next'
import ProjectCard from '@/components/projects/ProjectCard'
import { getDictionary, localizePath, resolveLocale } from '@/lib/i18n'
import { getProjects } from '@/lib/projects'
import { localeAlternates } from '@/lib/site'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale)
  const { metadata } = getDictionary(locale)

  return { ...metadata.projects, alternates: localeAlternates('/projects', locale) }
}

export default async function ProjectsPage({ params }: Props) {
  const locale = resolveLocale((await params).locale)
  const { projects: copy } = getDictionary(locale)
  const projects = getProjects(locale)

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">

      {/* Title + introduction */}
      <div className="mb-30">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-20">
          {copy.title}<span className="text-accent">.</span>
        </h1>
        <div className="space-y-4">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-text-secondary text-base md:text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Project list */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              href={localizePath(`/projects/${project.slug}`, locale)}
              workInProgressLabel={copy.workInProgress}
            />
          ))}
        </div>
      </section>

    </div>
  )
}
