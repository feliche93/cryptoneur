'use client'

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

export interface ModalProps {}
export const Modal: FC<ModalProps> = () => {
  const [open, setOpen] = useState(true)

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-base-300 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-base-200 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-warning">
                    <StarIcon className="h-6 w-6 text-warning-content" aria-hidden="true" />
                  </div>
                  <div className="flex justify-center">
                    <Image
                      src="/logo_transparent.png"
                      alt="Picture of the author"
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                      Day 1
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-base-content/80">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam
                        laudantium explicabo pariatur iste dolorem animi vitae error totam. At
                        sapiente aliquam accusamus facere veritatis.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="btn-primary btn w-full sm:col-start-2"
                    onClick={() => setOpen(false)}
                  >
                    Mint as NFT
                  </button>
                  <button
                    type="button"
                    className="sm:col-start-2sm:col-start-1 btn-outline btn mt-3 w-full sm:mt-0"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
