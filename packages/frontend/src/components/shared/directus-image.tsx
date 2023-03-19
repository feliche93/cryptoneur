import { components } from '@lib/directus-collections'
import { getAssetUrl } from '@lib/utils'
import Image from 'next/image'
import { FC } from 'react'

export interface DirectusImageProps {
  image: components['schemas']['Files']
  className?: string
  priority?: boolean
}
export const DirectusImage: FC<DirectusImageProps> = ({ image, priority = false, className }) => {
  if (!image) {
    return null
  }

  const { title, width, height, id } = image

  if (!title || !width || !height || !id) {
    return null
  }

  const src = getAssetUrl(id)

  if (!src) {
    return null
  }

  return (
    <Image
      className={className}
      priority={priority}
      alt={title}
      src={src}
      width={width}
      height={height}
    />
  )
}
