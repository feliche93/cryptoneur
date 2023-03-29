import { Popover } from '@headlessui/react'
import { Bars4Icon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { DeskltopActionButtons } from './desktop-action-buttons'
import { MenuProps } from './menu'
import { NavLinks } from './nav-links'

export interface DesktopMenuProps {
  links: MenuProps['links']
}
export const DesktopMenu: FC<DesktopMenuProps> = ({ links }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <nav
        className="relative flex items-center justify-between sm:h-10 md:justify-center"
        aria-label="Global"
      >
        <div className="flex flex-1 items-center md:absolute md:inset-y-0 md:left-0">
          <div className="flex w-full items-center justify-between md:w-auto">
            <Link href="/">
              <span className="sr-only">Workflow</span>
              <div className="flex items-center">
                <Image
                  //layout="fill"
                  width={60}
                  height={60}
                  className="hidden object-contain"
                  src="/logo_transparent.png"
                  alt="Cryptoneur Logo"
                />
                <span className="hidden pl-1 font-mono text-xl text-base-content/80">
                  Cryptoneur
                </span>
              </div>
            </Link>
            <div className="-mr-2 flex items-center md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-base-200 p-2 text-base-content/80 hover:bg-base-200 hover:text-base-content/80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                <span className="sr-only">Open main menu</span>
                <Bars4Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:space-x-10">
          <NavLinks links={links} />
        </div>
        <DeskltopActionButtons />
      </nav>
    </div>
  )
}
