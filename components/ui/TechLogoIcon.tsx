import Image from 'next/image'
import type { TechLogo } from '@/types/project'
import { techLogoMap } from '@/lib/icon-map'

type Props = {
  name: TechLogo
  size?: number
  className?: string
  alt?: string
}

export default function TechLogoIcon({ name, size = 24, className, alt }: Props) {
  return (
    <Image
      src={techLogoMap[name]}
      width={size}
      height={size}
      alt={alt ?? name}
      className={className}
    />
  )
}
