'use client'

import { FC, useState } from 'react'
import { Modal } from './Modal'


function

export const ModalWrapper: FC = () => {
  const [open, setOpen] = useState(true)

  return (
    <Modal
      primaryButtonLabel="Log in"
      primaryButtonLink="/sign-in"
      secondaryButtonLabel="Cancel"
      description="You need to be logged in to edit this grant."
      title="Log in to edit this grant"
    />
  )
}
