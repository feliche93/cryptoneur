'use client'

import { useState } from 'react'
import { Card } from '@components/advent-calendar/Card'
import { Header } from '@components/advent-calendar/Header'
import { Modal } from '@components/advent-calendar/Modal'

export default function Home() {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [jokes] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ])

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {jokes.map((joke, index) => {
            if (index < 24) {
              return (
                <Card
                  key={joke + index}
                  index={index + 1}
                  open={open}
                  setOpen={setOpen}
                  setActiveIndex={setActiveIndex}
                />
              )
            }
          })}
        </div>
      </div>
      {/* <div className="mt-12 flex justify-center">
        <Card index={25} open={open} setOpen={setOpen} setActiveIndex={setActiveIndex} />
      </div> */}
      <Modal joke={jokes[activeIndex]} index={activeIndex} open={open} setOpen={setOpen} />
    </>
  )
}
