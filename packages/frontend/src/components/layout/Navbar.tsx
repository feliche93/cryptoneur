'use client'

import React from 'react'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars4Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useSupabase } from '@components/supabase-provider'
import { NavLinks } from './nav-links'
import { DesktopMenu } from './destkop-menu'

// TODO: Check active links working

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

  return <div className="relative bg-base-200 md:overflow-hidden"></div>
}

export default Navbar
