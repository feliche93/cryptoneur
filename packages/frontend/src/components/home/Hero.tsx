import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import profilePic from '../../../public/profilePic.jpg'

function Hero() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center px-4 pt-16 sm:pt-8">
      <Image
        className="h-44 w-44 rounded-full object-contain sm:h-64 sm:w-64"
        alt="Felix Vemmer"
        src={profilePic}
      />
      <div className="pt-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-5xl">
          <span className="block xl:inline">👋 Welcome to my</span>{' '}
          <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent xl:inline">
            personal website
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-base-content/80 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
          Hey, I am Felix, a full-stack Web3 Developer and Data Engineer based in Berlin. Check out
          my portfolio projects, browse through my blog posts, or get in touch with me for freelance
          work.
        </p>
        <div className="mx-auto mt-5 flex max-w-md flex-col space-y-2 space-x-0 sm:flex sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-2 md:mt-8">
          <Link className="btn-primary btn-md btn sm:btn-lg" href="/gas-fees-calculator">
            Gas Fees Calculator
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
