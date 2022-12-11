import { FC } from 'react'

export interface HeaderProps {}
export const Header: FC<HeaderProps> = () => {
  return (
    <div className="relative mx-auto max-w-7xl">
      <div className="text-center">
        <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
          Latest Blog Posts
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-xl text-base-content/80 sm:mt-4">
          Learn more about my favorite topics around Crypto, Blockchain and Data.
        </p>
      </div>
    </div>
  )
}
