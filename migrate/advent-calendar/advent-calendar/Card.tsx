import { FC, useState } from 'react'

interface CardProps {
  index: number
  open: boolean
  setOpen: (bool: boolean) => void
  setActiveIndex: (index: number) => void
}

export const Card: FC<CardProps> = ({ index, open, setOpen, setActiveIndex }) => {
  const [warning, setWarning] = useState<string>('')

  const onClick = () => {
    const day = new Date()
    if (index <= day.getDate()) {
      setActiveIndex(index)
      setOpen(!open)
    } else {
      setWarning('Not yet')
    }
  }
  return (
    <div
      className="delay-15 card h-56 w-56 cursor-pointer bg-secondary shadow-xl transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-secondary hover:shadow-2xl"
      onClick={onClick}
    >
      <div className="flex h-full items-center justify-center">
        <div className="font-serif text-6xl text-white">{warning !== '' ? warning : index}</div>
      </div>
    </div>
  )
}
