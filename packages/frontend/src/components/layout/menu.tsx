import { useSupabase } from '@components/supabase-provider'
import { Popover } from '@headlessui/react'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'
import { DesktopMenu } from './destkop-menu'
import { MobileMenu } from './mobile-menu'

export interface MenuProps {}
export const Menu: FC<MenuProps> = () => {
  return (
    <div className="relative bg-base-200 md:overflow-hidden">
      <div className="relative bg-base-200 pt-6 pb-16 sm:pb-24">
        <Popover>
          <DesktopMenu />
          <MobileMenu />
        </Popover>
      </div>
    </div>
  )
}
