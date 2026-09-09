import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { contact } from '@/data/contact'
import { getDictionary, localizePath, resolveLocale } from '@/lib/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const locale = resolveLocale((await params).locale)
  const { cta, home } = getDictionary(locale)

  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center">
      <div className="w-full max-w-[1200px] mx-auto px-6 py-16">
        <div className="max-w-[900px]">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-[56px] font-semibold text-white leading-tight mb-14">
            {home.titleStart} <span className="text-accent">/</span> {home.titleEnd}
          </h1>

          <div className="space-y-4 mb-10">
            {home.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-text-secondary text-base md:text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button
              label={cta.viewProjects}
              variant="primary"
              icon="arrowRight"
              href={localizePath('/projects', locale)}
              className="w-full sm:w-auto justify-center"
            />
            <Button
              label={cta.contactMe}
              variant="dark"
              href={localizePath('/contact', locale)}
              className="w-full sm:w-auto justify-center"
            />
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-4">
            {contact.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="opacity-70 hover:opacity-100 transition-opacity duration-200"
              >
                <Icon name={link.icon} size={22} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
