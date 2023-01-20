'use client'

import React from 'react'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars4Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useSupabase } from '@components/supabase-provider'

// TODO: Check active links working
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Gas Fee Caculator', href: '/gas-fees-calculator' },
  { name: 'Blog', href: '/blog' },
  { name: 'Web 3 Grants', href: '/web3-grants' },
  // { name: "Web3 Journey", href: "/web3-journey" },
  // { name: "Portfolio", href: "/portfolio" },
  // { name: 'Freelancing', href: '/freelancing' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { supabase, session } = useSupabase()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log({ error })
    }
    router.refresh()
  }

  return (
    <div className="relative bg-base-200 md:overflow-hidden">
      <div className="relative bg-base-200 pt-6 pb-16 sm:pb-24">
        <Popover>
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
            </nav>
          </div>

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
                  {navigation.map((item) => (
                    <Link
                      className={classNames(
                        item.href === pathname ? 'text-black' : '',
                        'block rounded-md px-3 py-2 text-base font-medium text-base-content/80 hover:bg-base-200 hover:text-primary',
                      )}
                      key={item.name}
                      href={item.href}
                    >
                      {item.name}
                    </Link>
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
    </div>
  )
}

export default Navbar
