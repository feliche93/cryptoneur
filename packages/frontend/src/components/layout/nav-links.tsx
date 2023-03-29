import directus from '@lib/directus'
import { classNames } from '@utils/helpers'
import Link from 'next/link'
import { FC } from 'react'
import { navigation } from './Navbar'

export interface NavLinksProps {
  pathname: string | null
}

// @ts-expect-error Server Component
export const NavLinks: FC<NavLinksProps> = ({ pathname }) => {
  //   const data = await directus.singleton('navbar').read({
  //     fields: 'links.item.*.*.*',
  //   })

  //   if (!data) {
  //     throw new Error('Navbar not found')
  //   }

  //   return <pre>{JSON.stringify(data, null, 2)}</pre>

  return (
    <>
      {navigation.map((item) => (
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
