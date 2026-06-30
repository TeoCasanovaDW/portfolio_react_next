import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { contact } from '@/data/contact'

export default function HomePage() {
  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center">
      <div className="w-full max-w-[1200px] mx-auto px-6 py-16">
        <div className="max-w-[900px]">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-[56px] font-semibold text-white leading-tight mb-14">
            Développeur React <span className="text-accent">/</span> Next.js
          </h1>

          <div className="space-y-4 mb-10">
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              Je conçois des applications web modernes avec une attention
              particulière portée à la qualité du code, à l&apos;architecture et
              à l&apos;expérience utilisateur. Curieux de nature, je
              m&apos;intéresse également aux outils d&apos;IA, à
              l&apos;automatisation et aux méthodes qui permettent de développer
              plus efficacement.
            </p>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              J&apos;apprécie particulièrement les projets qui combinent
              réflexion technique, résolution de problèmes et création
              d&apos;interfaces claires et intuitives. Mon objectif est de
              construire des solutions fiables, maintenables et adaptées aux
              besoins réels des utilisateurs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button
              label="Voir mes projets"
              variant="primary"
              icon="arrowRight"
              href="/projects"
              className="w-full sm:w-auto justify-center"
            />
            <Button
              label="Me contacter"
              variant="dark"
              href="/contact"
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
