type Props = {
  title: string
  subtitle?: string
}

export default function SectionTitle({ title, subtitle }: Props) {
  return (
    <div className="mb-12">
      <h2 className="font-heading text-3xl font-semibold text-white">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-text-secondary text-base leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
