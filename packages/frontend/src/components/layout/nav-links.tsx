'use client'

import { Popover } from '@headlessui/react'
import { cn } from '@lib/utils'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { Link as LinkItem, MenuProps } from './menu'
import { navItems } from './nav-items'

export interface NavLinksProps {
  links: MenuProps['links']
  mobile?: boolean
}

export const NavLinks: FC<NavLinksProps> = ({ links, mobile }) => {
  const pathname = usePathname()

  console.log({ pathname })

  const language = pathname ? pathname.split('/')[1] : 'en'

  // console.log({ pathname, links })

  function getLabel(link: LinkItem) {
    return link.item.button.translations.find(
      (translation) => translation.languages_code.split('-')[0] === language,
    )?.label
  }

  function getLocalizedSlug(link: LinkItem) {
    const translations = link?.item?.page?.translations

    if (!translations) {
      throw new Error('No translations found')
    }

    const localizedSlug = translations.find(
      (translation) => translation.languages_code.split('-')[0] === language,
    )?.slug

    if (!localizedSlug) {
      console.log({ translations, language })
      throw new Error('No localized slug found')
    }

    return localizedSlug
  }

  function getHref(link: LinkItem) {
    if (link.item.href) {
      return link.item.href
    }
    if (link.item.page) {
      // console.log(`/${language}/${getLocalizedSlug(link)}`)
      return `/${language}/${getLocalizedSlug(link)}`
    }
    throw new Error('No href found')
  }

  if (mobile)
    return (
      <>
        {links.map((link: LinkItem) => (
          <Popover.Button
            as={Link}
            key={`${link.item.page}-${link.item.id}`}
            href={getHref(link)}
            className={cn(
              getHref(link) === pathname ? 'text-black' : '',
              'block rounded-md px-3 py-2 text-base font-medium text-base-content/80 hover:bg-base-200 hover:text-primary',
            )}
          >
            {getLabel(link)}
          </Popover.Button>
        ))}
      </>
    )

  return (
    <>
      {links.map((link: LinkItem) => (
        <Link
          href={getHref(link)}
          className={cn(
            getHref(link) === pathname ? 'text-primary' : '',
            'font-medium text-base-content/80 hover:text-primary',
          )}
          key={`${link.item.page}-${link.item.id}`}
        >
          {getLabel(link)}
        </Link>
      ))}
    </>
  )
}
