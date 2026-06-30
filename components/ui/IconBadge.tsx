import Icon from '@/components/ui/Icon'
import type { IconName } from '@/types/project'

type Props = {
  label: string
  icon: IconName
}

export default function IconBadge({ label, icon }: Props) {
  return (
    <span className="inline-flex items-center gap-2 px-5 py-2 bg-surface text-white border border-white/10 rounded-full text-sm font-medium">
      <Icon name={icon} size={14} alt="" />
      {label}
    </span>
  )
}
