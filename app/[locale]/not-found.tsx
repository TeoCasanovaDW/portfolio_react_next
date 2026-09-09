import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center">
      <div className="max-w-[1200px] mx-auto px-6 py-16">

        <p className="font-heading text-sm font-medium tracking-widest uppercase text-accent mb-6">
          Erreur 404
        </p>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-[56px] font-semibold text-white leading-tight mb-8">
          Page introuvable<span className="text-accent">.</span>
        </h1>

        <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-10 max-w-md">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>

        <Button
          label="Retour à l'accueil"
          variant="primary"
          icon="arrowLeft"
          iconPosition="left"
          href="/"
        />

      </div>
    </div>
  )
}
