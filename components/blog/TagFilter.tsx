import Link from 'next/link'

type Props = {
  tags: string[]
  /** Tag currently selected via `?tag=`, if any. */
  activeTag?: string
  /** Path to the blog list, already prefixed with the current locale. */
  basePath: string
  /** Label of the link that clears the filter and shows every article. */
  allLabel: string
  /** Accessible name of the filter group, already resolved in the current locale. */
  ariaLabel: string
}

const pill =
  'inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150'
const pillActive = 'bg-white text-[#121212] border border-[#dadada]'
const pillInactive =
  'bg-surface text-text-secondary border border-white/10 hover:text-white hover:border-white/20'

/**
 * Filters the article list by tag through plain links to `?tag=`, read server-side
 * by the blog page. No Client Component, no React state.
 */
export default function TagFilter({ tags, activeTag, basePath, allLabel, ariaLabel }: Props) {
  const options = [
    { label: allLabel, href: basePath, active: !activeTag },
    ...tags.map((tag) => ({
      label: tag,
      href: `${basePath}?tag=${encodeURIComponent(tag)}`,
      active: activeTag?.toLowerCase() === tag.toLowerCase(),
    })),
  ]

  return (
    <nav aria-label={ariaLabel} className="flex flex-wrap gap-2 mb-10">
      {options.map(({ label, href, active }) => (
        <Link
          key={label}
          href={href}
          aria-current={active ? 'page' : undefined}
          className={`${pill} ${active ? pillActive : pillInactive}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
