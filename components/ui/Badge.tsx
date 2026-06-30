type Variant = 'light' | 'dark' | 'overlay'

type Props = {
  label: string
  variant?: Variant
  icon?: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  light: 'bg-white text-[#121212] border border-[#dadada]',
  dark: 'bg-surface text-white border border-white/10',
  overlay: 'bg-surface/80 text-accent border border-white/15 backdrop-blur-sm shadow-md',
}

export default function Badge({ label, variant = 'dark', icon }: Props) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium ${variantClasses[variant]}`}>
      {icon}
      {label}
    </span>
  )
}
