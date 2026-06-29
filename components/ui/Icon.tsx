import Image from 'next/image'
import type { IconName } from '@/types/project'
import { iconMap } from '@/lib/icon-map'

type Props = {
  name: IconName
  size?: number
  className?: string
  alt?: string
}

export default function Icon({ name, size = 24, className, alt = '' }: Props) {
  return (
    <Image
      src={iconMap[name]}
      width={size}
      height={size}
      alt={alt}
      className={className}
    />
  )
}
