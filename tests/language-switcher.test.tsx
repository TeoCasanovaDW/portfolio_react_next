import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'
import { LOCALE_COOKIE } from '@/lib/i18n'

const pathname = vi.hoisted(() => ({ value: '/' }))

vi.mock('next/navigation', () => ({
  usePathname: () => pathname.value,
}))

/** `next/link` rendered as a plain anchor: jsdom cannot navigate, only the `href` matters. */
vi.mock('next/link', () => ({
  default: ({ children, href, onClick, ...rest }: React.ComponentProps<'a'>) => (
    <a
      href={href}
      {...rest}
      onClick={(event) => {
        event.preventDefault()
        onClick?.(event)
      }}
    >
      {children}
    </a>
  ),
}))

function setPathname(value: string) {
  pathname.value = value
}

function links() {
  return {
    en: screen.getByRole('link', { name: 'EN' }),
    fr: screen.getByRole('link', { name: 'FR' }),
  }
}

beforeEach(() => {
  setPathname('/')
  document.cookie = `${LOCALE_COOKIE}=; path=/; max-age=0`
})

describe('LanguageSwitcher', () => {
  it('renders exactly two links, labelled EN and FR', () => {
    render(<LanguageSwitcher locale="en" label="Language" />)

    const group = screen.getByRole('navigation', { name: 'Language' })
    expect(group).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(2)
    expect(links().en).toBeInTheDocument()
    expect(links().fr).toBeInTheDocument()
  })

  it('uses the translated group label', () => {
    render(<LanguageSwitcher locale="fr" label="Choix de la langue" />)

    expect(screen.getByRole('navigation', { name: 'Choix de la langue' })).toBeInTheDocument()
  })

  it.each([
    ['/', '/', '/fr'],
    ['/about', '/about', '/fr/about'],
    ['/projects', '/projects', '/fr/projects'],
    ['/contact', '/contact', '/fr/contact'],
    ['/projects/abricot', '/projects/abricot', '/fr/projects/abricot'],
  ])('keeps the current page %s when switching language', (path, enHref, frHref) => {
    setPathname(path)
    render(<LanguageSwitcher locale="en" label="Language" />)

    expect(links().en).toHaveAttribute('href', enHref)
    expect(links().fr).toHaveAttribute('href', frHref)
  })

  it.each([
    ['/fr', '/', '/fr'],
    ['/fr/about', '/about', '/fr/about'],
    ['/fr/projects/abricot', '/projects/abricot', '/fr/projects/abricot'],
  ])('keeps the current page %s when switching back to english', (path, enHref, frHref) => {
    setPathname(path)
    render(<LanguageSwitcher locale="fr" label="Choix de la langue" />)

    expect(links().en).toHaveAttribute('href', enHref)
    expect(links().fr).toHaveAttribute('href', frHref)
  })

  it('never emits an /en/... href, even when rendered from a prerendered /en page', () => {
    setPathname('/en/about')
    render(<LanguageSwitcher locale="en" label="Language" />)

    for (const link of screen.getAllByRole('link')) {
      expect(link.getAttribute('href')).not.toMatch(/^\/en(\/|$)/)
    }
    expect(links().en).toHaveAttribute('href', '/about')
    expect(links().fr).toHaveAttribute('href', '/fr/about')
  })

  it('marks the active language with aria-current and leaves the other one unmarked', () => {
    render(<LanguageSwitcher locale="fr" label="Choix de la langue" />)

    expect(links().fr).toHaveAttribute('aria-current', 'page')
    expect(links().en).not.toHaveAttribute('aria-current')
  })

  it('tags each link with its own lang and hreflang', () => {
    render(<LanguageSwitcher locale="en" label="Language" />)

    expect(links().en).toHaveAttribute('lang', 'en')
    expect(links().en).toHaveAttribute('hreflang', 'en')
    expect(links().fr).toHaveAttribute('lang', 'fr')
    expect(links().fr).toHaveAttribute('hreflang', 'fr')
  })

  it('writes the locale cookie before navigating, so the proxy does not bounce back', async () => {
    render(<LanguageSwitcher locale="en" label="Language" />)

    await userEvent.click(links().fr)

    expect(document.cookie).toContain(`${LOCALE_COOKIE}=fr`)
  })

  it('writes the cookie when switching back to english too', async () => {
    setPathname('/fr/about')
    render(<LanguageSwitcher locale="fr" label="Choix de la langue" />)

    await userEvent.click(links().en)

    expect(document.cookie).toContain(`${LOCALE_COOKIE}=en`)
  })

  it('closes the mobile menu through onNavigate', async () => {
    const onNavigate = vi.fn()
    render(<LanguageSwitcher locale="en" label="Language" onNavigate={onNavigate} />)

    await userEvent.click(links().fr)

    expect(onNavigate).toHaveBeenCalledOnce()
  })

  it('reaches both links with the keyboard', async () => {
    render(<LanguageSwitcher locale="en" label="Language" />)

    await userEvent.tab()
    expect(links().en).toHaveFocus()

    await userEvent.tab()
    expect(links().fr).toHaveFocus()
  })
})
