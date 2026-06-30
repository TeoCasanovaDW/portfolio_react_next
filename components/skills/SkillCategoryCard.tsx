import type { Skill } from '@/types/skill'
import type { TechLogo, IconName } from '@/types/project'
import TechLogoIcon from '@/components/ui/TechLogoIcon'
import Icon from '@/components/ui/Icon'
import { techLogoMap } from '@/lib/icon-map'

function isTechLogo(icon: TechLogo | IconName): icon is TechLogo {
  return icon in techLogoMap
}

type Props = {
  title: string
  skills: Skill[]
}

export default function SkillCategoryCard({ title, skills }: Props) {
  return (
    <div className="bg-surface rounded-2xl border border-white/5 p-6 md:p-8 flex flex-col">
      <h3 className="font-heading text-sm font-semibold text-white text-center uppercase tracking-wider mb-8">
        {title}
      </h3>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {skills.map((skill) => (
          <div key={skill.name} className="flex flex-col items-center gap-2">
            {isTechLogo(skill.icon) ? (
              <TechLogoIcon name={skill.icon} size={28} alt="" />
            ) : (
              <Icon name={skill.icon} size={28} alt="" />
            )}
            <span className="text-xs text-text-secondary text-center leading-tight">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
