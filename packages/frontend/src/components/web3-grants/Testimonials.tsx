import { strapi } from '@shared/strapi'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export interface TestimonialsProps {}
export const Testimonials: FC<TestimonialsProps> = async () => {
  const { data: grants } = await strapi.find<any>('grants', {
    populate: 'deep',
    pagination: {
      start: 0,
      limit: 6,
    },
  })

  const grantImages = grants.map((grant: any) => {
    // console.log({ grant })
    return {
      id: grant?.id,
      url: grant?.attributes?.logo?.data?.attributes?.url,
      width: grant?.attributes?.logo?.data?.attributes?.width,
      height: grant?.attributes?.logo?.data?.attributes?.height,
      alt: grant?.attributes?.logo?.data?.attributes?.alternativeText,
      href: grant?.attributes?.slug || '/web3-grants',
    }
  })

  return (
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <p className="text-center text-lg font-semibold text-base-content/80">
        Working with the biggest web3 projects
      </p>
      <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:mt-8">
        {grantImages.map((grant: any) => (
          <div
            key={grant?.id}
            className="col-span-1 flex justify-center rounded-lg bg-base-100 py-8 px-8"
          >
            <Link href={grant?.href}>
              <Image
                className="max-h-24 object-contain"
                src={grant.url}
                width={grant.width}
                height={grant.height}
                alt={grant.alt}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
