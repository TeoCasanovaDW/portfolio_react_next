import type { ComponentPropsWithoutRef } from 'react'
import type { MDXComponents } from 'mdx/types'

/** Body text of an article, aligned with the paragraphs of the rest of the site. */
const bodyText = 'text-text-secondary text-base md:text-lg leading-relaxed'

/** Headings share the display font; only the size and the spacing above change. */
const heading = 'font-heading font-semibold text-white'

/** Inline code. The monospace font already comes from the Tailwind preflight. */
const inlineCode = 'bg-surface border border-white/10 rounded px-1.5 py-0.5 text-[0.9em] text-white'

/**
 * A fenced block renders as `pre > code`, and that inner `code` goes through the `code`
 * component below. The overrides strip its inline chrome back off, so a block keeps a single
 * frame and one text size whether or not its language is set.
 * The colour is only a fallback: Shiki gives each token its own inline colour.
 */
const codeBlock = [
  'bg-surface border border-white/10 rounded-2xl p-5 md:p-6 my-8 overflow-x-auto',
  'text-sm leading-relaxed',
  '[&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0',
  '[&>code]:text-[1em] [&>code]:text-text-secondary',
].join(' ')

/**
 * Shiki replaces a fenced block with its own `pre`, carrying the theme class and the theme
 * background. Rather than spreading its props and letting them win, only what is wanted is
 * passed through: the block keeps the frame of the design system instead of the one bundled
 * with the theme, and keeps the `tabIndex` Shiki adds so keyboard users can scroll a block
 * wider than the page.
 */
function Pre({ children, tabIndex }: ComponentPropsWithoutRef<'pre'>) {
  return (
    <pre className={codeBlock} tabIndex={tabIndex}>
      {children}
    </pre>
  )
}

/** Opens external links in a new tab, and keeps internal ones in place. */
function Anchor({ href = '', children, ...props }: ComponentPropsWithoutRef<'a'>) {
  const isExternal = href.startsWith('http')

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="text-accent underline underline-offset-4 hover:no-underline"
      {...props}
    >
      {children}
    </a>
  )
}

/**
 * Maps every markdown tag of the articles to the design system of the site.
 * Each tag is styled explicitly: no typography plugin, nothing implicit.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className={`${heading} text-2xl md:text-3xl mt-14 mb-5`} {...props} />,
    h3: (props) => <h3 className={`${heading} text-xl md:text-2xl mt-10 mb-4`} {...props} />,
    h4: (props) => <h4 className={`${heading} text-lg mt-8 mb-3`} {...props} />,
    p: (props) => <p className={`${bodyText} mb-5`} {...props} />,
    a: Anchor,
    ul: (props) => <ul className="list-disc pl-6 mb-6 space-y-2 marker:text-accent" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
    li: (props) => <li className={bodyText} {...props} />,
    blockquote: (props) => (
      <blockquote className={`border-l-2 border-accent pl-5 my-8 italic ${bodyText}`} {...props} />
    ),
    code: (props) => <code className={inlineCode} {...props} />,
    pre: Pre,
    strong: (props) => <strong className="font-semibold text-white" {...props} />,
    hr: (props) => <hr className="border-white/10 my-12" {...props} />,
    ...components,
  }
}
