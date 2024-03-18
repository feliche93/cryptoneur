'use client'

import { Link } from '@/app/navigation'
import { navigationConfig } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Rocket } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'

export function MainNav() {
  const pathname = usePathname()
  const params = useParams()

  const locale = typeof params?.locale === 'string' ? params?.locale : 'en'

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Rocket className="w-6 h-6" />
        <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {navigationConfig.mainNav[locale].map((item) => {
          if (item.external || !item.href) return null

          return (
            <Link
              key={item.title}
              // @ts-expect-error
              href={item.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === item.href ? 'text-foreground' : 'text-foreground/60',
              )}
            >
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
