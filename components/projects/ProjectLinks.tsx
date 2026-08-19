import type { ProjectLink } from '@/types/project'
import Button from '@/components/ui/Button'

type Props = {
  links: ProjectLink[]
  className?: string
}

export default function ProjectLinks({ links, className = '' }: Props) {
  if (links.length === 0) return null

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {links.map((link) => (
        <Button
          key={link.label}
          label={link.label}
          variant={link.variant}
          icon={link.icon}
          href={link.href}
        />
      ))}
    </div>
  )
}
