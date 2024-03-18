import { cn } from '@/lib/utils'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { buttonVariants } from './ui/button'
import { Card } from './ui/card'

export interface ProductCard {
  product: {
    name: string
    description?: string
    price: string
    rating: number
    reviewCount: number
    href: string
    imageSrc: string
    imageAlt: string
    buttonLabel?: string
  }
}
export const ProductCard: FC<ProductCard> = ({ product }) => {
  return (
    <Card className="my-4 shadow-lg rounded-lg grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:items-center lg:gap-x-8">
      <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-r-none bg-background sm:col-span-4 lg:col-span-5">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          width={300}
          height={200}
          className="object-cover object-center w-full p-4"
        />
      </div>
      <div className="sm:col-span-8 lg:col-span-7 p-4">
        <h2 className="text-xl font-medium sm:pr-12">{product.name}</h2>

        <section aria-labelledby="information-heading" className="mt-1">
          <h3 id="information-heading" className="sr-only">
            Product information
          </h3>

          <p className="font-medium">{product.price}</p>

          {/* Reviews */}
          <div className="mt-4">
            <h4 className="sr-only">Reviews</h4>
            <div className="flex items-center">
              <p className="text-sm text-muted-foreground">
                {product.rating}
                <span className="sr-only"> out of 5 stars</span>
              </p>
              <div className="ml-1 flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={cn(
                      product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                      'h-5 w-5 flex-shrink-0',
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="ml-4 hidden lg:flex lg:items-center">
                <span className="text-gray-300" aria-hidden="true">
                  &middot;
                </span>
                <a
                  href="#"
                  className="ml-4 text-sm font-medium text-accent-foreground hover:underline"
                >
                  See all {product.reviewCount} reviews
                </a>
              </div>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-4 space-y-6">
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>
          )}
        </section>

        <section aria-labelledby="options-heading" className="mt-8">
          <Link
            href={product.href}
            target="_blank"
            className={buttonVariants({
              className: 'w-full',
            })}
          >
            {product.buttonLabel || 'View on Amazon'}
          </Link>
        </section>
      </div>
    </Card>
  )
}
