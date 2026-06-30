import { contact } from '@/data/contact'
import ContactForm from '@/components/contact/ContactForm'
import CopyEmailButton from '@/components/ui/CopyEmailButton'
import SocialButton from '@/components/ui/SocialButton'

export default function ContactPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-16">

      {/* Titre */}
      <h1 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-10">
        Contact<span className="text-accent">.</span>
      </h1>

      {/* Texte d'introduction */}
      <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-16">
        Vous souhaitez échanger à propos d&apos;une opportunité, d&apos;un projet ou de mon profil ?
      </p>

      {/* Layout desktop : form | Ou | email + réseaux */}
      <div className="flex flex-col lg:flex-row items-start">

        {/* Formulaire */}
        <div className="w-full lg:flex-1 lg:max-w-[540px]">
          <ContactForm />
        </div>

        {/* Séparateur "Ou" — centré entre les deux colonnes */}
        <div className="w-full lg:w-auto flex items-center lg:flex-col lg:self-center py-8 lg:py-0 lg:px-12">
          <div className="h-px flex-1 bg-white/10 lg:hidden" />
          <span className="text-text-secondary text-sm shrink-0 px-4 lg:px-0">Ou</span>
          <div className="h-px flex-1 bg-white/10 lg:hidden" />
        </div>

        {/* Email + réseaux — décalé pour s'aligner avec le premier input (label text-sm + mb-1.5) */}
        <div className="w-full lg:w-auto lg:min-w-[260px] lg:pt-[1.625rem] flex flex-col gap-4">
          <CopyEmailButton email={contact.email} />
          <div className="flex flex-col gap-3">
            {contact.socialLinks.map((link) => (
              <SocialButton key={link.label} socialLink={link} />
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
