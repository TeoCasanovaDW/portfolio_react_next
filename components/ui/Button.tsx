import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import type { IconName } from '@/types/project'

type Variant = 'primary' | 'secondary' | 'dark'

type Props = {
  label: string
  variant?: Variant
  icon?: IconName
  iconPosition?: 'left' | 'right'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-accent text-[#121212] hover:bg-accent/90',
  secondary: 'border border-white/20 text-white hover:bg-white/5',
  dark: 'bg-surface text-white border border-white/10 hover:border-white/20',
}

const iconClasses: Record<Variant, string> = {
  primary: 'brightness-0',
  secondary: '',
  dark: '',
}

export default function Button({
  label,
  variant = 'primary',
  icon,
  iconPosition = 'right',
  href,
  onClick,
  type = 'button',
  className = '',
}: Props) {
  const base = `inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-150 ${variantClasses[variant]} ${className}`

  const iconEl = icon ? (
    <Icon name={icon} size={16} alt="" className={iconClasses[variant]} />
  ) : null

  const content = (
    <>
      {iconPosition === 'left' && iconEl}
      {label}
      {iconPosition === 'right' && iconEl}
    </>
  )

  if (href) {
    const isExternal = href.startsWith('http')
    return isExternal ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
        {content}
      </a>
    ) : (
      <Link href={href} className={base}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={base}>
      {content}
    </button>
  )
}
