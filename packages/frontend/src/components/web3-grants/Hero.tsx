import Link from 'next/link'

import { FC } from 'react'

export interface HeroProps {}
export const Hero: FC<HeroProps> = () => {
  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center px-4 pt-16 sm:pt-10">
      {/* <Image
        className="h-44 w-44 rounded-full object-contain sm:h-64 sm:w-64"
        alt="Felix Vemmer"
        src={profilePic}
      /> */}
      <div className="pt-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-5xl">
          <span className="block xl:inline">Easily find and apply to</span>{' '}
          <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent xl:inline">
            web3 Grants
          </span>
          {/* <span className="block xl:inline">.</span>{' '} */}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-base-content/80 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
          We have a complete and up-to-date database of web3 grants. Filter and search for grants by
          category, amount, and more.
        </p>
        <div className="mx-auto mt-5 flex max-w-md flex-col space-y-2 space-x-0 sm:flex sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-2 md:mt-8">
          <Link className="btn-primary btn-md btn sm:btn-lg" href="/web3-grants#">
            Find a grant
          </Link>
          {/* <Link className="btn btn-md sm:btn-lg btn-outline" href="/blog">
            Blog
          </Link> */}
        </div>
      </div>
    </main>
  )
}

export default Hero
