// TEMPORAIRE — page de preview des composants UI.
// À supprimer avant le déploiement en production.

import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import SectionTitle from '@/components/ui/SectionTitle'
import SocialButton from '@/components/ui/SocialButton'
import CopyEmailButton from '@/components/ui/CopyEmailButton'
import Icon from '@/components/ui/Icon'
import TechLogoIcon from '@/components/ui/TechLogoIcon'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectImage from '@/components/projects/ProjectImage'
import SkillCard from '@/components/skills/SkillCard'
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'
import { contact } from '@/data/contact'

function PreviewSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-16">
      <p className="text-xs font-mono text-accent mb-4 uppercase tracking-widest">{title}</p>
      {children}
    </section>
  )
}

const iconNames = [
  'github', 'linkedin', 'arrowRight', 'arrowLeft',
  'copy', 'menu', 'auth', 'api',
  'route', 'dashboard', 'chart', 'loading', 'logout',
] as const

const techLogoNames = [
  'javascript', 'typescript', 'react', 'next',
  'node', 'postgresql', 'supabase', 'vercel',
  'figma', 'git', 'github', 'vitest', 'agile', 'sdd',
] as const

const skillsSample = skills.filter((s) =>
  ['javascript', 'react', 'node', 'auth', 'vercel', 'agile'].includes(s.icon)
)

export default function DevUIPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="mb-16 p-4 rounded-xl border border-accent/30 bg-accent/5">
        <p className="text-accent text-sm font-mono">
          /dev/ui — page temporaire · à supprimer avant déploiement
        </p>
      </div>

      {/* Button */}
      <PreviewSection title="Button">
        <div className="flex flex-wrap gap-4">
          <Button label="Voir mes projets" variant="primary" icon="arrowRight" href="/projects" />
          <Button label="Me contacter" variant="secondary" href="/contact" />
          <Button label="GitHub" variant="dark" icon="github" href="https://github.com" />
          <Button label="Avec flèche" variant="primary" icon="arrowRight" />
          <Button label="Secondary icon" variant="secondary" icon="arrowRight" />
        </div>
      </PreviewSection>

      {/* Badge */}
      <PreviewSection title="Badge">
        <div className="flex flex-wrap gap-3">
          <Badge label="dark (défaut)" variant="dark" />
          <Badge label="light" variant="light" />
          <Badge label="Full-stack" />
          <Badge label="Next.js" />
          <Badge label="TypeScript" />
          <Badge label="API" />
          <Badge label="Cron" />
        </div>
      </PreviewSection>

      {/* Card */}
      <PreviewSection title="Card">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
          <Card className="p-6">
            <p className="text-text-secondary text-sm">Card simple avec contenu texte.</p>
          </Card>
          <Card className="p-6">
            <p className="text-white text-sm font-medium mb-2">Titre dans une card</p>
            <p className="text-text-secondary text-xs">Contenu secondaire.</p>
          </Card>
        </div>
      </PreviewSection>

      {/* SectionTitle */}
      <PreviewSection title="SectionTitle">
        <div className="space-y-8">
          <SectionTitle title="Titre de section" />
          <SectionTitle
            title="Avec sous-titre"
            subtitle="Texte secondaire qui apporte un contexte ou une description courte sous le titre."
          />
        </div>
      </PreviewSection>

      {/* Icon */}
      <PreviewSection title="Icon (IconName)">
        <div className="flex flex-wrap gap-6">
          {iconNames.map((name) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center bg-surface rounded-lg border border-white/5">
                <Icon name={name} size={20} alt={name} />
              </div>
              <span className="text-xs text-text-secondary font-mono">{name}</span>
            </div>
          ))}
        </div>
      </PreviewSection>

      {/* TechLogoIcon */}
      <PreviewSection title="TechLogoIcon (TechLogo)">
        <div className="flex flex-wrap gap-6">
          {techLogoNames.map((name) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center bg-surface rounded-lg border border-white/5">
                <TechLogoIcon name={name} size={24} alt={name} />
              </div>
              <span className="text-xs text-text-secondary font-mono">{name}</span>
            </div>
          ))}
        </div>
      </PreviewSection>

      {/* SkillCard */}
      <PreviewSection title="SkillCard">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-2xl">
          {skillsSample.map((skill) => (
            <SkillCard key={skill.icon} skill={skill} />
          ))}
        </div>
      </PreviewSection>

      {/* ProjectImage */}
      <PreviewSection title="ProjectImage">
        <div className="max-w-sm rounded-2xl overflow-hidden border border-white/5">
          <ProjectImage src={projects[0].image} alt={projects[0].name} />
        </div>
      </PreviewSection>

      {/* ProjectCard */}
      <PreviewSection title="ProjectCard">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </PreviewSection>

      {/* SocialButton */}
      <PreviewSection title="SocialButton">
        <div className="flex flex-wrap gap-4">
          {contact.socialLinks.map((link) => (
            <SocialButton key={link.icon} socialLink={link} />
          ))}
        </div>
      </PreviewSection>

      {/* CopyEmailButton */}
      <PreviewSection title="CopyEmailButton">
        <CopyEmailButton email={contact.email} />
      </PreviewSection>
    </div>
  )
}
