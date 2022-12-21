import { FC } from 'react'

export const Header: FC = () => {
  return (
    <div className="border-b border-gray-200 pb-10">
      <h1 className="text-4xl font-bold tracking-tight">Web3 Grants</h1>
      <p className="mt-4 text-base text-base-content/80">
        Up-to-date and complete collection of web3 grants.
      </p>
    </div>
  )
}
