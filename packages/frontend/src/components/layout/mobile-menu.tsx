'use client'

import { Popover, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Fragment } from 'react'
import { DesktopMenu } from './destkop-menu'

import { FC } from 'react'
import { usePathname } from 'next/navigation'
import { classNames } from '@utils/helpers'
import { navItems } from './nav-items'
import { useSupabase } from '@components/supabase-provider'

export interface MobileMenuProps {}
export const MobileMenu: FC<MobileMenuProps> = () => {
  const pathname = usePathname()
  const { session } = useSupabase()

  return (
    <div className="relative bg-base-200 pt-6 pb-16 sm:pb-24">
      <Popover>
        <DesktopMenu pathname={pathname} />
        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="overflow-hidden rounded-lg bg-base-200 shadow-md ring-1 ring-black ring-opacity-5">
              <div className="flex items-center justify-between px-5 pt-4">
                <div>
                  {/* <Image
                  //layout="fill"
                  width={50}
                  height={50}
                  className="object-contain"
                  src="/logo_transparent.png"
                  alt="Cryptoneur Logo"
                /> */}
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-base-content/80 hover:bg-base-200 hover:text-base-content/80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3">
                {navItems.map((item) => (
                  <Popover.Button
                    as={Link}
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.href === pathname ? 'text-black' : '',
                      'block rounded-md px-3 py-2 text-base font-medium text-base-content/80 hover:bg-base-200 hover:text-primary',
                    )}
                  >
                    {item.name}
                  </Popover.Button>
                ))}
              </div>
              <div className="hidden md:absolute md:inset-y-0 md:right-0 md:flex md:items-center md:justify-end">
                {session ? (
                  <button className="btn-outline btn-primary btn" onClick={handleLogout}>
                    Log Out
                  </button>
                ) : (
                  <Link className="btn-primary btn" href={'/sign-in'}>
                    Log In
                  </Link>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}
