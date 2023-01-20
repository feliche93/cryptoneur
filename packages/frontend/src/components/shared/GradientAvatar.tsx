import Image from 'next/image'
import { FC } from 'react'

export interface GraidentAvatarProps {
  image: string
  size: number
  alt: string
}
export const GraidentAvatar: FC<GraidentAvatarProps> = ({ image, size, alt }) => {
  return (
    <div className="h-fit w-fit rounded-full bg-gradient-to-tr from-primary to-base-content">
      <Image
        src={image}
        width={size}
        height={size}
        alt={alt}
        className={`aspect-square rounded-full object-contain p-1`}
      />
    </div>
  )
}
