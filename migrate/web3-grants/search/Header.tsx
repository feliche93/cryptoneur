import { FC } from 'react'

export const Header: FC = () => {
  return (
    <div className="border-b border-gray-200 pb-10">
      <div className="flex flex-col flex-col justify-between space-y-4 md:flex-row md:space-y-0">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Web3 Grants</h1>
          <p className="mt-4 text-base text-base-content/80">
            Up-to-date and complete collection of web3 grants.
          </p>
        </div>
        <a className="btn-primary btn w-full sm:w-fit" href={'/web3-grants/add'}>
          Add new Grant
        </a>
      </div>
    </div>
  )
}
