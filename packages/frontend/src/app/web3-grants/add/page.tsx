import { GrantForm } from '@components/web3-grants/add/GrantForm'
import { GrantFormTally } from '@components/web3-grants/add/GrantFormTally'
import { NextPage } from 'next'
import { headers } from 'next/headers'
import Script from 'next/script'

const AddGrant = () => {
  return (
    <>
      <GrantFormTally />
    </>
  )
}

export default AddGrant
