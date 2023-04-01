import { notFound } from 'next/navigation'
import { FC } from 'react'
import { BlockPageLink } from './blocks/block-page-link'
import { BlockCalendar } from './blocks/block-calendar'
import { BlockFeatures } from './blocks/block-features'
import { BlockHero } from './blocks/block-hero'
import { BlockLogoCloud } from './blocks/block-logo-cloud'
import { BlockExternalLink } from './blocks/block-external-link'
import { BlockFeatureGrid } from './blocks/block-feature-grid'
import { BlockFaq } from './blocks/block-faq'
import { BlockFoundersNote } from './blocks/block-founders-note'

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
    case 'block_external_link':
      return <BlockExternalLink lang={lang} id={item} />
    case 'block_cal':
      return <BlockCalendar lang={lang} id={item} />
    case 'block_features':
      return <BlockFeatures lang={lang} id={item} />
    case 'block_feature_grid':
      return <BlockFeatureGrid lang={lang} id={item} />
    case 'block_logo_cloud':
      return <BlockLogoCloud lang={lang} id={item} />
    case 'block_faq':
      return <BlockFaq lang={lang} id={item} />
    case 'block_founders_note':
      return <BlockFoundersNote lang={lang} id={item} />
    default:
      throw new Error(`Unknown collection: ${collection}`)
  }
}
