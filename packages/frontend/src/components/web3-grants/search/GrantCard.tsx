import { FC } from 'react'

export interface GrantCardProps {
  grant: any
}
export const GrantCard: FC<GrantCardProps> = ({ grant }) => {
  return (
    <>
      {/* <pre>{JSON.stringify(grant, null, 2)}</pre> */}
      <h2>{grant?.attributes?.name}</h2>
    </>
  )
}
