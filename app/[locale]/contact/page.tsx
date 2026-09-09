import { contact as contactInfo } from '@/data/contact'
import ContactForm from '@/components/contact/ContactForm'
import CopyEmailButton from '@/components/ui/CopyEmailButton'
import SocialButton from '@/components/ui/SocialButton'
import { getDictionary, resolveLocale } from '@/lib/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: Props) {
  const locale = resolveLocale((await params).locale)
  const { contact: copy } = getDictionary(locale)

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">

      {/* Titre */}
      <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-10">
        {copy.title}<span className="text-accent">.</span>
      </h1>

      {/* Texte d'introduction */}
      <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-16">
        {copy.intro}
      </p>

      {/* Layout desktop : form | Ou | email + réseaux */}
      <div className="flex flex-col lg:flex-row items-start">

        {/* Formulaire */}
        <div className="w-full lg:flex-1 lg:max-w-[540px]">
          <ContactForm locale={locale} copy={copy.form} />
        </div>

        {/* Séparateur "Ou" — centré entre les deux colonnes */}
        <div className="w-full lg:w-auto flex items-center lg:flex-col lg:self-center py-8 lg:py-0 lg:px-12">
          <div className="h-px flex-1 bg-white/10 lg:hidden" />
          <span className="text-text-secondary text-sm shrink-0 px-4 lg:px-0">{copy.separator}</span>
          <div className="h-px flex-1 bg-white/10 lg:hidden" />
        </div>

        {/* Email + réseaux — décalé pour s'aligner avec le premier input (label text-sm + mb-1.5) */}
        <div className="w-full lg:w-auto lg:min-w-[260px] lg:pt-[1.625rem] flex flex-col gap-4">
          <CopyEmailButton
            email={contactInfo.email}
            label={copy.copyEmail}
            copiedLabel={copy.copied}
          />
          <div className="flex flex-col gap-3">
            {contactInfo.socialLinks.map((link) => (
              <SocialButton key={link.label} socialLink={link} />
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
