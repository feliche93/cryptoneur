import * as Icons from 'react-icons/md'
import { cn } from '@lib/utils'
import { FC } from 'react'

export interface BlockProps {
  iconName: string
  color?: string
  size?: number
}

const snakeToPascal = (string: string) => {
  return string
    .split('/')
    .map((snake) =>
      snake
        .split('_')
        .map((substr) => substr.charAt(0).toUpperCase() + substr.slice(1))
        .join(''),
    )
    .join('/')
}

export const BlockIcon: FC<BlockProps> = ({ iconName, color = 'text-black', size = 6 }) => {
  console.log(iconName)

  const modifiedIconName = `Md${snakeToPascal(iconName)}`

  const icons = { ...Icons }
  const Icon = icons[modifiedIconName] as any

  if (!Icon) {
    return null
  }

  return <Icon className={cn([`${color}`, `h-${size}`, `w-${size}`])} />
}
