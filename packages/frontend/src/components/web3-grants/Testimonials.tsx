import { createServerClient } from '@utils/supabase-server'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export interface TestimonialsProps {}

export const Testimonials: FC<TestimonialsProps> = async () => {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('grants')
    .select('name,logo,id,slug')
    .in('id', [1, 2, 6, 20, 29, 7])
  // console.log({ data, error })

  return (
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <p className="text-center text-lg font-semibold text-base-content/80">
        Working with the biggest web3 projects
      </p>
      <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:mt-8">
        {data &&
          data.map((grant) => (
            <div
              key={grant?.id}
              className="col-span-1 flex justify-center rounded-lg bg-base-100 py-8 px-8"
            >
              {grant?.logo && grant?.slug && (
                <Link href={`web3-grants/${grant?.slug}`}>
                  <Image
                    className="max-h-24 object-contain"
                    src={grant.logo}
                    width={200}
                    height={200}
                    alt={grant?.name}
                  />
                </Link>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}
