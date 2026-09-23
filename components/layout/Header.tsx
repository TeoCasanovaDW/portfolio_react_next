'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'
import { localizePath, stripLocale } from '@/lib/i18n/routing'
import type { Dictionary, Locale } from '@/types/i18n'
import type { NavigationItem } from '@/types/navigation'

type Props = {
  locale: Locale
  items: NavigationItem[]
  nav: Dictionary['nav']
}

export default function Header({ locale, items, nav }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const currentPath = stripLocale(pathname)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">

        <Link href={localizePath('/', locale)} onClick={closeMenu} className="flex-shrink-0" aria-label={nav.home}>
          <Image src="/logo.svg" width={36} height={36} alt="Téo Casanova" />
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          {/* Desktop navigation */}
          <nav aria-label={nav.mainLabel} className="hidden md:flex items-center gap-8">
            {items.map((item) => (
              <Link
                key={item.href}
                href={localizePath(item.href, locale)}
                className={`text-sm font-medium transition-colors duration-150 hover:text-white ${
                  currentPath === item.href ? 'text-white' : 'text-text-secondary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* End of desktop navigation, left of the burger on mobile */}
          <LanguageSwitcher locale={locale} label={nav.languageLabel} onNavigate={closeMenu} />

          {/* Mobile burger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-text-secondary hover:text-white transition-colors duration-150"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-white/5 bg-[#121212]/95 backdrop-blur-sm">
          <nav aria-label={nav.mobileLabel} className="max-w-[1200px] mx-auto px-6 py-2 flex flex-col">
            {items.map((item) => (
              <Link
                key={item.href}
                href={localizePath(item.href, locale)}
                onClick={closeMenu}
                className={`py-4 text-base font-medium border-b border-white/5 last:border-b-0 transition-colors duration-150 hover:text-white ${
                  currentPath === item.href ? 'text-white' : 'text-text-secondary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
