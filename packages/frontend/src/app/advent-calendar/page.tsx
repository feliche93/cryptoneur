'use client'

import { useState } from 'react'
import { Card } from '@components/adventCalendar/Card'
import { Header } from '@components/adventCalendar/Header'
import { Modal } from '@components/adventCalendar/Modal'

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
        <div className="grid grid-cols-4 gap-12">
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
      <div className="mt-12 flex justify-center">
        <Card index={25} open={open} setOpen={setOpen} setActiveIndex={setActiveIndex} />
      </div>
      <Modal joke={jokes[activeIndex]} index={activeIndex} open={open} setOpen={setOpen} />
    </>
  )
}
