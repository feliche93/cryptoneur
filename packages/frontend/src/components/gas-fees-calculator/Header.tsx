import React from 'react'

import { FC } from 'react'

export const Header: FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-5 sm:px-6 sm:pt-12 lg:px-8">
      <div className="text-center">
        <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-base font-semibold uppercase tracking-wide text-transparent">
          Gas Fees Calculator
        </h2>
        <p className="mt-1 text-3xl font-extrabold sm:text-4xl sm:tracking-tight lg:text-4xl">
          Sick of Paying too high gas fees?
        </p>
        <p className="mx-auto mt-5 max-w-4xl text-lg text-base-content/80">
          Start calculating gas fees for the biggest networks at different transaction speeds in
          your own local currency for a variety of transcations.
        </p>
      </div>
    </div>
  )
}
