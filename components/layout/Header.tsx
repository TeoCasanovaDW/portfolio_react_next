'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { navigation } from '@/data/navigation'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">

        <Link href="/" onClick={closeMenu} className="flex-shrink-0" aria-label="Accueil">
          <Image src="/logo.svg" width={36} height={36} alt="Téo Casanova" />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-150 hover:text-white ${
                pathname === item.href ? 'text-white' : 'text-text-secondary'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-text-secondary hover:text-white transition-colors duration-150"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
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

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-white/5 bg-[#121212]/95 backdrop-blur-sm">
          <nav aria-label="Navigation mobile" className="max-w-[1200px] mx-auto px-6 py-2 flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`py-4 text-base font-medium border-b border-white/5 last:border-b-0 transition-colors duration-150 hover:text-white ${
                  pathname === item.href ? 'text-white' : 'text-text-secondary'
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
