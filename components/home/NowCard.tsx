import Link from 'next/link'
import Card from '@/components/ui/Card'

type Props = {
  /** Small uppercase label, e.g. "Currently reading". */
  label: string
  /** Visual on the left (a book cover, an icon). */
  media?: React.ReactNode
  title: string
  subtitle: string
  /** Extra element under the text (a badge). */
  footer?: React.ReactNode
  link?: { label: string; href: string }
}

/** Card of the "now" row on the home page: what I am reading, what I am working on. */
export default function NowCard({ label, media, title, subtitle, footer, link }: Props) {
  return (
    <Card className="flex gap-5 p-5 h-full">
      {media}
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-xs font-medium uppercase tracking-widest text-accent mb-3">{label}</span>
        <h2 className="font-heading text-xl font-semibold text-white leading-snug">{title}</h2>
        <p className="text-text-secondary text-sm leading-relaxed mt-1.5">{subtitle}</p>
        {footer && <div className="mt-3">{footer}</div>}
        {link && (
          <Link
            href={link.href}
            className="mt-auto pt-4 text-sm font-medium text-white hover:text-accent transition-colors duration-150"
          >
            {link.label} <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </Card>
  )
}
