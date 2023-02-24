import Image from 'next/image'
import React from 'react'

type Props = {}

import { FC } from 'react'

export const GitcoinGrant: FC = () => {
  return (
    <div>
      <a
        href="https://gitcoin.co/grants/5753/gas-fees-calculator-multi-currency-network-txn-ty"
        target={'_blank'}
        rel="noopener noreferrer"
      >
        <div className="flex flex-col items-center">
          <p className="px-5 pt-5 text-center font-bold">
            Support this public good through a Gitcoin Grant:
          </p>
          <Image src={'/logos/gitcoinGrant.svg'} height={100} width={300} alt="Gitcoin Grant" />
        </div>
      </a>
    </div>
  )
}
