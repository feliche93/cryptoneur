'use client'

import { classNames } from '@utils/helpers'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { navItems } from './nav-items'

export interface NavLinksProps {}

export const NavLinks: FC<NavLinksProps> = () => {
  const pathname = usePathname()

  console.log({ pathname })

  //   const data = await directus.singleton('navbar').read({
  //     fields: 'links.item.*.*.*',
  //   })

  //   if (!data) {
  //     throw new Error('Navbar not found')
  //   }

  //   return <pre>{JSON.stringify(data, null, 2)}</pre>

  return (
    <>
      {navItems.map((item) => (
        <Link
          className={classNames(
            item.href === pathname ? 'text-primary' : '',
            'font-medium text-base-content/80 hover:text-primary',
          )}
          key={item.name}
          href={item.href}
        >
          {item.name}
        </Link>
      ))}
    </>
  )
}
