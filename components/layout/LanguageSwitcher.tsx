'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import { usePathname } from 'next/navigation'
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE } from '@/lib/i18n/cookie'
import { locales } from '@/lib/i18n/locales'
import { localizePath, stripLocale } from '@/lib/i18n/routing'
import type { Locale } from '@/types/i18n'

/**
 * Writes the language preference before navigating: without this cookie, rule 3
 * of the proxy would immediately send an unprefixed path back to `/fr`.
 */
function persistLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`
}

/**
 * Purely decorative flags, sitting above the label.
 * The accessible name of the link stays `EN` / `FR`: the SVG is hidden from screen readers.
 */
function Flag({ locale }: { locale: Locale }) {
  const common = {
    width: 14,
    height: 10,
    'aria-hidden': true,
    className: 'rounded-[1px]',
  } as const

  if (locale === 'fr') {
    return (
      <svg {...common} viewBox="0 0 3 2">
        <rect width="3" height="2" fill="#ED2939" />
        <rect width="2" height="2" fill="#FFFFFF" />
        <rect width="1" height="2" fill="#002395" />
      </svg>
    )
  }

  return (
    <svg {...common} viewBox="0 0 60 30">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0 60 30M60 0 0 30" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0 0 60 30M60 0 0 30" stroke="#C8102E" strokeWidth="3" />
      <path d="M30 0V30M0 15H60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}

type Props = {
  locale: Locale
  label: string
  onNavigate?: () => void
}

/**
 * `EN | FR` switch to the current page in the other language.
 * Without JavaScript, the target stays reachable but the choice is not remembered (§5).
 */
export default function LanguageSwitcher({ locale, label, onNavigate }: Props) {
  const currentPath = stripLocale(usePathname())

  const selectLocale = (target: Locale) => {
    persistLocale(target)
    onNavigate?.()
  }

  return (
    <nav aria-label={label} className="flex items-center text-xs font-medium">
      {locales.map((target, index) => (
        <Fragment key={target}>
          {index > 0 && (
            <span aria-hidden="true" className="text-text-secondary">
              |
            </span>
          )}
          <Link
            href={localizePath(currentPath, target)}
            lang={target}
            hrefLang={target}
            aria-current={target === locale ? 'page' : undefined}
            onClick={() => selectLocale(target)}
            className={`flex flex-col items-center gap-1 px-1.5 py-2 transition-colors duration-150 hover:text-white ${
              target === locale ? 'text-white' : 'text-text-secondary'
            }`}
          >
            <span className={target === locale ? '' : 'opacity-60'}>
              <Flag locale={target} />
            </span>
            {target.toUpperCase()}
          </Link>
        </Fragment>
      ))}
    </nav>
  )
}
