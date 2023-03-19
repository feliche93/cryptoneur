import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import profilePic from '../../../public/profilePic.jpg'
import { Title } from '@components/blocks/Title'

import { FC } from 'react'
import directus from '@lib/directus'
import { notFound } from 'next/navigation'
import { Subtitle } from './subtitle'
import { getAssetUrl } from '@lib/utils'
import { DirectusImage } from '@components/shared/directus-image'

export interface HeroProps {
  id: number
  lang: string
}

//
export const Hero: FC<HeroProps> = async ({ id, lang }) => {
  // return <pre>{JSON.stringify({ id, lang }, null, 2)}</pre>
  const data = await directus.items('block_hero').readOne(id, {
    fields: ['*.*'],
    deep: {
      translations: {
        _filter: {
          languages_code: {
            _starts_with: lang,
          },
        },
      },
    },
  })

  const translations = data?.translations

  if (!translations?.length || typeof translations[0] === 'number') {
    notFound()
  }

  const { title, subtitle } = translations[0]
  const image = data?.image

  if (!title || !subtitle || !image || typeof image === 'string') {
    notFound()
  }

  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center px-4 pt-16 sm:pt-8">
      <DirectusImage
        image={image}
        className="h-44 w-44 rounded-full object-contain sm:h-64 sm:w-64"
      />
      <div className="pt-8 text-center">
        <Title input={title} />
        <Subtitle input={subtitle} />
        <div className="mx-auto mt-5 flex max-w-md flex-col space-y-2 space-x-0 sm:flex sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-2 md:mt-8">
          <Link className="btn-primary btn-md btn sm:btn-lg" href="/gas-fees-calculator">
            Gas Fees Calculator
          </Link>
          {/* <Link className="btn btn-md sm:btn-lg btn-outline" href="/blog">
            Blog
          </Link> */}
        </div>
      </div>
    </main>
  )
}

export default Hero
