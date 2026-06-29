type Props = {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className = '' }: Props) {
  return (
    <div className={`bg-surface rounded-2xl border border-white/5 ${className}`}>
      {children}
    </div>
  )
}
