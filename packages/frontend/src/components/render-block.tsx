import { notFound } from 'next/navigation'
import { FC } from 'react'
import { BlockHero } from './blocks/block-hero'
import { BlockPageLink } from './blocks/block-page-link'

export interface RenderBlockProps {
  block:
    | number
    | {
        id?: number | undefined
        collection?: string | null | undefined
      }
  lang: string
}

export const RenderBlock: FC<RenderBlockProps> = ({ block, lang }) => {
  if (typeof block === 'number') {
    notFound()
  }

  const { id, collection } = block

  if (!id || !collection) {
    notFound()
  }

  switch (collection) {
    case 'block_hero':
      return <BlockHero lang={lang} id={id} />
    case 'block_page_link':
      return <BlockPageLink lang={lang} id={id} />
  }
}
