import { projects } from '@/data/projects'
import ProjectCard from '@/components/projects/ProjectCard'

export default function ProjectsPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">

      {/* Titre + introduction */}
      <div className="mb-30">
        <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-20">
          Projets<span className="text-accent">.</span>
        </h1>
        <div className="space-y-4">
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            Voici une sélection de projets alignés avec mon objectif actuel : concevoir et
            développer des applications web modernes avec React, Next.js, TypeScript, API et
            données.
          </p>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            Ces projets ne représentent pas l&apos;ensemble de mon parcours. J&apos;ai également
            travaillé sur d&apos;autres projets web, notamment sur des stacks plus anciennes ou
            différentes, mais j&apos;ai choisi de mettre ici en avant ceux qui reflètent le mieux
            mon positionnement actuel.
          </p>
        </div>
      </div>

      {/* Liste des projets */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

    </div>
  )
}
