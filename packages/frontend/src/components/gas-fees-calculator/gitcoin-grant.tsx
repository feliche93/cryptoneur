import Image from 'next/image'
import { FC } from 'react'

interface Translation {
  gitcoin_title: string
}

interface Data {
  translations: Translation[]
  gitcoin_logo: {
    id: string
  }
}

export const GitcoinGrant: FC = async () => {
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
          <Image
            src={'/logos/gitcoinGrant.svg'}
            alt="GitcoinGrant"
            priority={true}
            height={100}
            width={300}
            className="dark:bg-primary dark:rounded-lg dark:my-2"
          />
        </div>
      </a>
    </div>
  )
}
