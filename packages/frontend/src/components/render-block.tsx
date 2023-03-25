import { notFound } from 'next/navigation'
import { FC } from 'react'
import { BlockCalendar } from './blocks/block-calendar'
import { BlockFeatures } from './blocks/block-features'
import { BlockHero } from './blocks/block-hero'
import { BlockLogoCloud } from './blocks/block-logo-cloud'
import { BlockPageLink } from './blocks/block-page-link'

export interface RenderBlockProps {
  block:
    | number
    | {
        collection?: string | null | undefined
        id?: number | undefined
        item?: string[] | undefined
      }
  lang: string
}

export const RenderBlock: FC<RenderBlockProps> = ({ block, lang }) => {
  if (typeof block === 'number') {
    notFound()
  }

  const { id, collection, item } = block

  if (!id || !collection || !item) {
    notFound()
  }

  switch (collection) {
    case 'block_hero':
      return <BlockHero lang={lang} id={item} />
    case 'block_page_link':
      return <BlockPageLink lang={lang} id={item} />
    case 'block_cal':
      return <BlockCalendar lang={lang} id={item} />
    case 'block_features':
      return <BlockFeatures lang={lang} id={item} />
    case 'block_logo_cloud':
      return <BlockLogoCloud lang={lang} id={item} />
    default:
      throw new Error(`Unknown collection: ${collection}`)
  }
}
