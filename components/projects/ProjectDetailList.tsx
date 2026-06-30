type Props = {
  items: string[]
}

export default function ProjectDetailList({ items }: Props) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-text-secondary text-base leading-relaxed">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}
