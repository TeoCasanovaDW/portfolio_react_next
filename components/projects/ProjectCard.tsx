import Link from 'next/link'
import type { Project } from '@/types/project'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import TechLogoIcon from '@/components/ui/TechLogoIcon'
import ProjectImage from '@/components/projects/ProjectImage'

type Props = {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  const githubLink = project.links.find((l) => l.icon === 'github')

  return (
    <article className="bg-surface rounded-2xl border border-[#e5e5e5]/20 overflow-hidden hover:border-[#e5e5e5]/30 transition-colors duration-200">

      <div className="relative">
        <Link href={`/projects/${project.slug}`} tabIndex={-1} aria-hidden>
          <ProjectImage src={project.image} alt={project.name} />
        </Link>
        {project.slug === 'ai-model-radar' && (
          <div className="absolute top-3 right-3 z-10 pointer-events-none">
            <Badge
              label="Work in Progress"
              variant="overlay"
              icon={
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              }
            />
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col gap-4">

        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">{project.type}</span>
          <span className="text-xs text-text-secondary">{project.year}</span>
        </div>

        <div>
          <Link href={`/projects/${project.slug}`}>
            <h3 className="font-heading text-xl font-semibold text-white hover:text-accent transition-colors duration-150">
              {project.name}
            </h3>
          </Link>
          <p className="text-text-secondary text-sm leading-relaxed mt-2">
            {project.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} label={tag} variant="light" />
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          {githubLink ? (
            <Button
              label="GitHub"
              variant="dark"
              icon="github"
              href={githubLink.href}
            />
          ) : (
            <span />
          )}

          <div className="flex items-center gap-3">
            {project.techLogos.map((logo) => (
              <TechLogoIcon key={logo} name={logo} size={20} alt={logo} />
            ))}
          </div>
        </div>

      </div>
    </article>
  )
}
