import { GrantForm } from '@components/web3-grants/add/GrantForm'
import { createServerClient } from '@utils/supabase-server'
import { NextPage } from 'next'
import { headers } from 'next/headers'
import Script from 'next/script'

const EditGrant = async ({ params: { slug } }: { params: { slug: string } }) => {
  console.log({ slug })

  const supabase = createServerClient()

  let { data: grant, error } = await supabase
    .from('grants')
    .select(
      `
      *,
      blockchains(*),
      categories(*),
      use_cases(*),
      funding_minimum_currency(symbol),
      funding_maximum_currency(symbol)
      `,
    )
    .eq('slug', slug)
    .single()

  grant.categories = grant.categories.map((category) => category.name)
  grant.blockchains = grant?.blockchains.map((blockchain) => blockchain.name)
  grant.use_cases = grant?.use_cases.map((use_case) => use_case.name)
  grant?.funding_maximum_currency &&
    (grant.funding_maximum_currency = grant.funding_maximum_currency.symbol)
  grant?.funding_minimum_currency &&
    (grant.funding_minimum_currency = grant.funding_minimum_currency.symbol)
  //   console.log({ ...grant, ...error })

  return (
    <>
      <GrantForm grant={grant} />
    </>
  )
}

export default EditGrant
