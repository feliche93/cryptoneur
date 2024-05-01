import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export interface FeaturedProps {}
export const Featured: FC<FeaturedProps> = () => {
  const websites = [
    {
      alt: 'FelixVemmer.com',
      src: '/personal-projects/felixvemmer-com.png',
      href: 'https://felixvemmer.com/?ref=cryptoneur.xyz',
    },
    {
      alt: 'BacklinkGPT.com',
      src: '/personal-projects/backlinkgpt-com.png',
      href: 'https://www.backlinkgpt.com/?ref=cryptoneur.xyz',
    },
    {
      alt: 'No-Code Scraper',
      src: '/personal-projects/nocode-scraper-com.png',
      href: 'https://nocodescraper.com/?ref=cryptoneur.xyz',
    },
  ]

  return (
    <div className="py-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8">My Other Projects</h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-1 sm:grid-cols-3 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:gap-x-10 lg:mx-0 lg:max-w-none">
          {websites.map((website, index) => (
            <div
              key={website.src}
              className={
                cn()
                // 'col-span-2 lg:col-span-1',
                // index === 3 && 'sm:col-start-2',
                // index === 4 && 'col-start-2 sm:col-start-auto',
              }
            >
              <Link
                rel="noopener noreferrer"
                className="flex flex-col items-center"
                target="_blank"
                href={website.href}
              >
                <span className="py-4 text-xl font-semibold text-center">{website.alt}</span>

                <Image
                  className="max-h-96 w-fit object-contain yscale hover:grayscale-0 transition rounded-lg border shadow-lg"
                  src={website.src}
                  alt={website.alt}
                  width={2530}
                  height={1750}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
