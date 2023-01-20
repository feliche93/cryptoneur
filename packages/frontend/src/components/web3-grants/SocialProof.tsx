'use client'

import { ArrowDownLeftIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Quote } from './Quote'

export const SocialProof: FC = () => {
  return (
    <div className="carousel py-8">
      <div
        id="slide1"
        className="carousel-item relative  mx-auto w-full max-w-4xl flex-col sm:flex-none"
      >
        <Quote
          image="/quotes/AwWgWl-Y_400x400.jpg"
          title="Ghostwriter & developer for Web3 Start-ups"
          person="Chandan | Web3"
          quote="That's super usefull for first time founders and Developers."
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <Link href="/web3-grants#slide4" className="btn-secondary btn-circle btn">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <Link href="/web3-grants#slide2" className="btn-secondary btn-circle btn">
            <ArrowRightIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
      <div
        id="slide1"
        className="carousel-item relative  mx-auto w-full max-w-4xl flex-col sm:flex-none"
      >
        <Quote
          image="/quotes/AwWgWl-Y_400x400.jpg"
          title="Ghostwriter & developer for Web3 Start-ups"
          person="Chandan | Web3"
          quote="That's super usefull for first time founders and Developers."
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <Link href="/web3-grants#slide4" className="btn-secondary btn-circle btn">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <Link href="/web3-grants#slide2" className="btn-secondary btn-circle btn">
            <ArrowRightIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>

      {/* <div id="slide2" className="carousel-item relative w-full">
        <img src="https://placeimg.com/800/200/arch" className="w-full" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn-circle btn">
            ❮
          </a>
          <a href="#slide3" className="btn-circle btn">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img src="https://placeimg.com/800/200/arch" className="w-full" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn-circle btn">
            ❮
          </a>
          <a href="#slide4" className="btn-circle btn">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img src="https://placeimg.com/800/200/arch" className="w-full" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn-circle btn">
            ❮
          </a>
          <a href="#slide1" className="btn-circle btn">
            ❯
          </a>
        </div>
      </div> */}
    </div>
  )
}
