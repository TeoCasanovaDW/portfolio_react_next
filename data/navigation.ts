import type { Dictionary } from '@/types/i18n'
import type { NavigationItem } from '@/types/navigation'

/**
 * Navigation principale, libellés résolus dans une locale.
 * Les `href` restent non préfixés : le préfixe est ajouté par `localizePath`.
 */
export function getNavigation(dictionary: Dictionary): NavigationItem[] {
  return [
    { label: dictionary.nav.about, href: '/about' },
    { label: dictionary.nav.projects, href: '/projects' },
    { label: dictionary.nav.contact, href: '/contact' },
  ]
}
