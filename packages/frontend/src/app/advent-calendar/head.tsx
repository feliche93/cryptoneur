import { NextSeo } from 'next-seo'
import type { NextSeoProps } from 'next-seo'
import cover from '@/../public/advent-calendar/cover.png'

import { NEXT_SEO_DEFAULT } from '@/../next-seo.config' // your path will vary

export default async function Head() {
  const updateMeta: NextSeoProps = {
    ...NEXT_SEO_DEFAULT,
    title: 'NFT Advent Calendar 2022',
    openGraph: {
      title: 'Crypto Jokes NFT Advent Calendar 2022',
      description:
        'SBF, Do Kwon and family made 2022 a shitty crypto bearish year, better joke about it 🤓',
      images: [
        {
          url: cover!.src,
          width: cover!.width,
          height: cover!.height,
          alt: 'Crypto Jokes NFT Advent Calendar 2022',
        },
      ],
    },
  }
  return <NextSeo {...updateMeta} useAppDir={true} />
}
