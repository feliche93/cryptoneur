import { notFound } from 'next/navigation'
import { FC } from 'react'
import Hero from './blocks/hero'

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
      return <Hero lang={lang} id={id} />
  }
}
