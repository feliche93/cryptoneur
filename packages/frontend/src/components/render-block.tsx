import { FC } from 'react'
import { BlockCalendar } from './blocks/block-calendar'
import { BlockExternalLink } from './blocks/block-external-link'
import { BlockFaq } from './blocks/block-faq'
import { BlockFeatureGrid } from './blocks/block-feature-grid'
import { BlockFeatures } from './blocks/block-features'
import { BlockFoundersNote } from './blocks/block-founders-note'
import { BlockHero } from './blocks/block-hero'
import { BlockLogoCloud } from './blocks/block-logo-cloud'
import { BlockPageLink } from './blocks/block-page-link'

export interface RenderBlockProps {
  block: {
    collection: string
    item: string
  }
  lang: string
}

export const RenderBlock: FC<RenderBlockProps> = ({ block, lang }) => {
  const { collection, item: id } = block

  switch (collection) {
    case 'block_hero':
      return <BlockHero lang={lang} id={id} />
    case 'block_page_link':
      return <BlockPageLink lang={lang} id={id} />
    case 'block_external_link':
      return <BlockExternalLink lang={lang} id={id} />
    case 'block_cal':
      return <BlockCalendar lang={lang} id={id} />
    case 'block_features':
      return <BlockFeatures lang={lang} id={id} />
    case 'block_feature_grid':
      return <BlockFeatureGrid lang={lang} id={id} />
    case 'block_logo_cloud':
      return <BlockLogoCloud lang={lang} id={id} />
    case 'block_faq':
      return <BlockFaq lang={lang} id={id} />
    case 'block_founders_note':
      return <BlockFoundersNote lang={lang} id={id} />
    // case 'block_table':
    //   return <BlockTable lang={lang} id={id} />
    default:
      return null
      throw new Error(`Unknown collection: ${collection}`)
  }
}
