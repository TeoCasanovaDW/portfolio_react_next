import Image from 'next/image'

type Props = {
  src: string
  alt: string
  className?: string
}

/** Book cover at a 2:3 ratio, whatever the source image proportions. */
export default function BookCover({ src, alt, className = '' }: Props) {
  return (
    <div className={`relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg ${className}`}>
      <Image src={src} alt={alt} fill sizes="(min-width: 768px) 200px, 40vw" className="object-cover" />
    </div>
  )
}
