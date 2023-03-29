// TODO: Check active links working

import directus from '@lib/directus'
import { Menu, MenuProps } from './menu'

import { FC } from 'react'

export interface NavbarProps {}
// @ts-expect-error Server Component
export const Navbar: FC<NavbarProps> = async () => {
  const data = (await directus.singleton('navbar').read({
    fields: 'links.item.*.*.*',
  })) as unknown as MenuProps

  if (!data) {
    throw new Error('Navbar not found')
  }

  const { links } = data

  return <Menu links={links} />
}

export default Navbar
