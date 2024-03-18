import type { NextSeoProps } from 'next-seo'
import profilePic from '../frontend/public/profilePic.jpg'

// get current window url

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  defaultTitle: 'Cryptoneur',
  description:
    'Welcome to my personal website! Check out my portofolio projects, browse through my blog posts or get in touch with me for freelance work.',
  openGraph: {
    title: 'Cryptoneur',
    type: 'website',
    locale: 'en_US',
    // url: `${window.location.href}`,
    site_name: 'Cryptoneur',
    images: [
      {
        url: `${profilePic.src}`,
        width: profilePic.width,
        height: profilePic.height,
        alt: 'Cryptoneur Pfofile',
      },
    ],
  },
  twitter: {
    handle: '@cryptoneur_eth',
    site: '@cryptoneur_eth',
    cardType: 'summary_large_image',
  },
}
