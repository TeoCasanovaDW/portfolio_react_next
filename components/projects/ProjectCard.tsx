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

      <Link href={`/projects/${project.slug}`} tabIndex={-1} aria-hidden>
        <ProjectImage src={project.image} alt={project.name} />
      </Link>

      <div className="p-6 flex flex-col gap-4">

        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">{project.type}</span>
          <span className="text-xs text-text-secondary">{project.year}</span>
        </div>

        <div>
          <Link href={`/projects/${project.slug}`}>
            <h3 className="font-heading text-xl font-semibold text-white hover:text-text-secondary transition-colors duration-150">
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
