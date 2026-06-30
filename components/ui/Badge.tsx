type Variant = 'light' | 'dark'

type Props = {
  label: string
  variant?: Variant
}

const variantClasses: Record<Variant, string> = {
  light: 'bg-white text-[#121212] border border-[#dadada]',
  dark: 'bg-surface text-white border border-white/10',
}

export default function Badge({ label, variant = 'dark' }: Props) {
  return (
    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${variantClasses[variant]}`}>
      {label}
    </span>
  )
}
