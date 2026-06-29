import type { Skill } from '@/types/skill'
import type { TechLogo, IconName } from '@/types/project'
import TechLogoIcon from '@/components/ui/TechLogoIcon'
import Icon from '@/components/ui/Icon'
import { techLogoMap } from '@/lib/icon-map'

function isTechLogo(icon: TechLogo | IconName): icon is TechLogo {
  return icon in techLogoMap
}

type Props = {
  skill: Skill
}

export default function SkillCard({ skill }: Props) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-surface rounded-xl border border-white/5">
      {isTechLogo(skill.icon) ? (
        <TechLogoIcon name={skill.icon} size={22} alt="" />
      ) : (
        <Icon name={skill.icon} size={22} alt="" />
      )}
      <span className="text-sm font-medium text-white">{skill.name}</span>
    </div>
  )
}
