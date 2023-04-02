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
import { BlockTable } from './blocks/block-table/block-table'

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
    // case 'block_features':
    //   return <BlockFeatures lang={lang} id={item} />
    // case 'block_feature_grid':
    //   return <BlockFeatureGrid lang={lang} id={item} />
    // case 'block_logo_cloud':
    //   return <BlockLogoCloud lang={lang} id={item} />
    // case 'block_faq':
    //   return <BlockFaq lang={lang} id={item} />
    // case 'block_founders_note':
    //   return <BlockFoundersNote lang={lang} id={item} />
    // case 'block_table':
    //   return <BlockTable lang={lang} id={item} />
    default:
      return null
      throw new Error(`Unknown collection: ${collection}`)
  }
}
