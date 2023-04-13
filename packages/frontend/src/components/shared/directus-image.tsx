import { FileType, ID } from '@directus/sdk'
import directus from '@lib/directus'
import { getAssetUrl } from '@lib/utils'
import Image from 'next/image'
import { FC } from 'react'

export interface DirectusImageProps {
  id: ID
  className?: string
  priority?: boolean
  height?: number
  width?: number
}

// @ts-expect-error Server Component
export const DirectusImage: FC<DirectusImageProps> = async ({
  id,
  priority = false,
  className,
  height: heightProp,
  width: widthProp,
}) => {
  const file = (await directus.files.readOne(id)) as unknown as FileType

  const { title, width, height, id: fileId } = file

  const src = getAssetUrl(fileId)

  if (!src) {
    return <></>
  }

  if (!title || !width || !height || !fileId) {
    if (heightProp && widthProp) {
      return (
        <Image
          className={className}
          priority={priority}
          alt={title}
          src={src}
          width={widthProp ?? width}
          height={heightProp ?? height}
        />
      )
    }

    return <></>
  }

  return (
    <Image
      className={className}
      priority={priority}
      alt={title}
      src={src}
      width={widthProp ?? width}
      height={heightProp ?? height}
    />
  )
}
