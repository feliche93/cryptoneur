import { NextSeo } from 'next-seo'
import type { NextSeoProps } from 'next-seo'
import { NEXT_SEO_DEFAULT } from '@/../next-seo.config' // your path will vary
import { strapi } from '@shared/strapi'
import { headers } from 'next/headers'
import image1 from '@/../public/og/web-3-grants/image1.jpg'
import image2 from '@/../public/og/web-3-grants/image2.jpg'
import image3 from '@/../public/og/web-3-grants/image3.jpg'

export default async function Head({ params: { slug } }: { params: { slug: string } }) {
  const headerList = headers()
  const referer = headerList.get('referer')

  // console.log({ referer })

  const updateMeta: NextSeoProps = {
    ...NEXT_SEO_DEFAULT,
    title: 'Web3 Grant Platform - Find Funding for Your Project - Advanced Filtering & Insights',
    description:
      'Find the perfect funding opportunity for your web3 project with our comprehensive and constantly updated grant database. Advanced filtering options and data-driven insights increase your chances of success. Join our growing community and contribute to the database.',
    openGraph: {
      title: 'Web3 Grant Platform - Find Funding for Your Project',
      description:
        'Find the perfect funding opportunity for your web3 project with our comprehensive and constantly updated grant database. Advanced filtering options and data-driven insights increase your chances of success. Join our growing community and contribute to the database.',
      url: referer || 'https://cryptoneur.xyz/',
      type: 'website',
      images: [
        {
          url: image1.src,
          width: image1.width,
          height: image3.height,
          alt: 'Web3 Grant Platform - Find Funding for Your Project',
        },
        {
          url: image2.src,
          width: image2.width,
          height: image2.height,
          alt: 'Web3 Grant Platform - Find Funding for Your Project',
        },
        {
          url: image3.src,
          width: image3.width,
          height: image3.height,
          alt: 'Web3 Grant Platform - Find Funding for Your Project',
        },
      ],
    },
  }

  // console.log({ updateMeta })

  return <NextSeo {...updateMeta} useAppDir={true} />
}
