import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/components/layout/Header'
import { getNavigation } from '@/data/navigation'
import { getDictionary, locales } from '@/lib/i18n'
import type { Locale } from '@/types/i18n'

const user = userEvent.setup({ delay: null })
const pathname = vi.hoisted(() => ({ value: '/' }))

vi.mock('next/navigation', () => ({
  usePathname: () => pathname.value,
}))

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

vi.mock('next/image', () => ({
  default: ({ src, alt, ...rest }: React.ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...rest} />
  ),
}))

function renderHeader(locale: Locale, path = '/') {
  pathname.value = path
  const dictionary = getDictionary(locale)

  return render(
    <Header locale={locale} items={getNavigation(dictionary)} nav={dictionary.nav} />
  )
}

beforeEach(() => {
  pathname.value = '/'
})

describe.each(locales)('Header in %s', (locale) => {
  const { nav } = getDictionary(locale)

  it('labels the three navigation entries in the current language', () => {
    renderHeader(locale)

    const desktop = screen.getByRole('navigation', { name: nav.mainLabel })
    expect(within(desktop).getByRole('link', { name: nav.about })).toBeInTheDocument()
    expect(within(desktop).getByRole('link', { name: nav.projects })).toBeInTheDocument()
    expect(within(desktop).getByRole('link', { name: nav.contact })).toBeInTheDocument()
  })

  it('prefixes internal links with the locale, english staying unprefixed', () => {
    renderHeader(locale)

    const prefix = locale === 'en' ? '' : `/${locale}`
    const desktop = screen.getByRole('navigation', { name: nav.mainLabel })

    expect(within(desktop).getByRole('link', { name: nav.about })).toHaveAttribute(
      'href',
      `${prefix}/about`
    )
    expect(screen.getByRole('link', { name: nav.home })).toHaveAttribute('href', prefix || '/')
  })

  it('never emits an /en/... href, even from a prerendered /en page', () => {
    renderHeader(locale, locale === 'en' ? '/en/about' : '/fr/about')

    for (const link of screen.getAllByRole('link')) {
      expect(link.getAttribute('href')).not.toMatch(/^\/en(\/|$)/)
    }
  })

  it('marks the current page as active whether the URL is prefixed or not', () => {
    renderHeader(locale, locale === 'en' ? '/projects' : '/fr/projects')

    const desktop = screen.getByRole('navigation', { name: nav.mainLabel })
    expect(within(desktop).getByRole('link', { name: nav.projects }).className).toContain(
      'text-white'
    )
    expect(within(desktop).getByRole('link', { name: nav.about }).className).toContain(
      'text-text-secondary'
    )
  })

  it('carries the language switcher next to the navigation', () => {
    renderHeader(locale)

    const switcher = screen.getByRole('navigation', { name: nav.languageLabel })
    expect(within(switcher).getByRole('link', { name: 'EN' })).toBeInTheDocument()
    expect(within(switcher).getByRole('link', { name: 'FR' })).toBeInTheDocument()
  })

  it('opens and closes the mobile menu with a translated button label', async () => {
    renderHeader(locale)

    const burger = screen.getByRole('button', { name: nav.openMenu })
    expect(burger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('navigation', { name: nav.mobileLabel })).not.toBeInTheDocument()

    await user.click(burger)

    const mobile = screen.getByRole('navigation', { name: nav.mobileLabel })
    expect(within(mobile).getAllByRole('link')).toHaveLength(3)
    expect(screen.getByRole('button', { name: nav.closeMenu })).toHaveAttribute(
      'aria-expanded',
      'true'
    )

    await user.click(screen.getByRole('button', { name: nav.closeMenu }))
    expect(screen.queryByRole('navigation', { name: nav.mobileLabel })).not.toBeInTheDocument()
  })

  it('closes the mobile menu when a language is picked', async () => {
    renderHeader(locale)

    await user.click(screen.getByRole('button', { name: nav.openMenu }))
    expect(screen.getByRole('navigation', { name: nav.mobileLabel })).toBeInTheDocument()

    const switcher = screen.getByRole('navigation', { name: nav.languageLabel })
    await user.click(within(switcher).getByRole('link', { name: locale === 'en' ? 'FR' : 'EN' }))

    expect(screen.queryByRole('navigation', { name: nav.mobileLabel })).not.toBeInTheDocument()
  })
})

describe('header wording', () => {
  /** Libellés propres à une langue : `Contact` est identique dans les deux et ne prouve rien. */
  const exclusiveLabels = {
    en: ['Home', 'About', 'Projects', 'Main navigation', 'Open menu'],
    fr: ['Accueil', 'À propos', 'Projets', 'Navigation principale', 'Ouvrir le menu'],
  } as const

  it.each(locales)('shows no label from the other language in %s', (locale) => {
    renderHeader(locale)

    const other = locale === 'en' ? 'fr' : 'en'
    const markup = screen.getByRole('banner').outerHTML

    for (const label of exclusiveLabels[other]) {
      expect(markup).not.toContain(label)
    }
    for (const label of exclusiveLabels[locale]) {
      expect(markup).toContain(label)
    }
  })
})
