import Image from 'next/image'

type Props = {
  src: string
  alt: string
  className?: string
}

export default function ProjectImage({ src, alt, className = '' }: Props) {
  return (
    <div className={`relative w-full aspect-video overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
      />
    </div>
  )
}
