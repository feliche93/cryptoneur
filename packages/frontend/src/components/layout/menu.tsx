'use client'

import { Popover } from '@headlessui/react'
import { FC } from 'react'
import { DesktopMenu } from './desktop-menu'
import { MobileMenu } from './mobile-menu'

export interface MenuProps {
  links: Link[]
}

export interface Link {
  item: Item
}

export interface Item {
  id: number
  sort: null
  date_created: Date
  date_updated: Date | null
  page?: Page
  button: Button
  href?: string
  target?: null
  rel?: null
}

export interface Button {
  id: number
  sort: null
  date_created: Date
  date_updated: Date | null
  variant: string
  size: string
  shape: string
  translations: ButtonTranslation[]
}

export interface ButtonTranslation {
  id: number
  block_button_id: number
  languages_code: string
  label: string
}

export interface Page {
  id: number
  status: string
  sort: null
  date_created: Date
  date_updated: Date
  translations: PageTranslation[]
  content: Content[]
}

export interface Content {
  id: number
  pages_id: number
  item: string
  collection: string
}

export interface PageTranslation {
  id: number
  pages_id: number
  languages_code: string
  slug: string
}

export const Menu: FC<MenuProps> = ({ links }) => {
  return (
    <div className="relative bg-base-200 md:overflow-hidden">
      <div className="relative bg-base-200 pt-6 pb-16 sm:pb-24">
        <Popover>
          <DesktopMenu links={links} />
          <MobileMenu links={links} />
        </Popover>
      </div>
    </div>
  )
}
