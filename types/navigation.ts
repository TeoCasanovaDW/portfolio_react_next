export type NavigationItem = {
  label: string
  href: string
}

export type SocialLink = {
  label: string
  href: string
  icon: 'linkedin' | 'github' | 'x'
}

export type ContactInfo = {
  email: string
  socialLinks: SocialLink[]
}
