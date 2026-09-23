import type { Dictionary } from '@/types/i18n'
import type { NavigationItem } from '@/types/navigation'

/**
 * Main navigation, with labels resolved in a locale.
 * The `href` values stay unprefixed: the prefix is added by `localizePath`.
 */
export function getNavigation(dictionary: Dictionary): NavigationItem[] {
  return [
    { label: dictionary.nav.about, href: '/about' },
    { label: dictionary.nav.projects, href: '/projects' },
    { label: dictionary.nav.contact, href: '/contact' },
  ]
}
