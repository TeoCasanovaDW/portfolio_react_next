import Icon from '@/components/ui/Icon'
import type { SocialLink } from '@/types/navigation'

type Props = {
  socialLink: SocialLink
}

export default function SocialButton({ socialLink }: Props) {
  return (
    <a
      href={socialLink.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={socialLink.label}
      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-surface border border-white/10 text-white text-sm font-medium hover:border-white/20 transition-colors duration-150"
    >
      <Icon name={socialLink.icon} size={18} alt="" />
      {socialLink.label}
    </a>
  )
}
