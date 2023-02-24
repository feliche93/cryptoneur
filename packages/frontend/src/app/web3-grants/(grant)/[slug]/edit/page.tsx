import { GrantForm, GrantSchema } from '@components/web3-grants/add/GrantForm'
import { Modal } from '@components/web3-grants/edit/Modal'
import { Database } from '@lib/database.types'
import { createServerClient } from '@utils/supabase-server'
import { notFound } from 'next/navigation'

const EditGrant = async ({ params: { slug } }: { params: { slug: string } }) => {
  const supabase = createServerClient()
  const { data: blockchains, error: blockchainsError } = await supabase
    .from('blockchains')
    .select('*')

  const { data: categories, error: categoriesError } = await supabase.from('categories').select('*')

  const { data: use_cases, error: useCasesError } = await supabase.from('use_cases').select('*')

  const { data: fiats, error: fiatsError } = await supabase.from('fiats').select('*')

  let { data: grant, error: grantError } = await supabase
    .from('grants')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (
    grantError ||
    !grant ||
    categoriesError ||
    useCasesError ||
    blockchainsError ||
    !blockchains ||
    !categories ||
    !use_cases ||
    fiatsError ||
    !fiats
  ) {
    notFound()
  }

  let { data: grant_blokchains, error: grant_blockchains_error } = await supabase
    .from('grant_blockchains')
    .select('*')
    .eq('grant_id', grant.id)

  let { data: grant_categories, error: grant_categories_error } = await supabase
    .from('grant_categories')
    .select('*')
    .eq('grant_id', grant.id)

  let { data: grant_use_cases, error: grant_use_cases_error } = await supabase
    .from('grant_use_cases')
    .select('*')
    .eq('grant_id', grant.id)

  if (
    grant_blockchains_error ||
    grant_categories_error ||
    grant_use_cases_error ||
    !grant_blokchains ||
    !grant_categories ||
    !grant_use_cases
  ) {
    notFound()
  }

  // console.log({ grant_use_cases, grant_use_cases_error })

  const grant_blokchain_options = grant_blokchains.map((grantBlockchain) => {
    const label = blockchains.find(
      (blockchain) => blockchain.id === grantBlockchain.blockchain_id,
    )?.name
    const value = grantBlockchain.blockchain_id

    return {
      label,
      value,
    }
  })

  const grant_category_options = grant_categories.map((grantCategory) => {
    const label = categories.find((category) => category.id === grantCategory.category_id)?.name
    const value = grantCategory.category_id

    return {
      label,
      value,
    }
  })

  const grant_use_case_options = grant_use_cases.map((grantUseCase) => {
    const label = use_cases.find((use_case) => use_case.id === grantUseCase.use_case_id)?.name
    const value = grantUseCase.use_case_id

    return {
      label,
      value,
    }
  })

  const funding_minimum_option = {
    label: fiats.find((fiat) => fiat.id === grant?.funding_minimum_currency)?.symbol,
    value: grant?.funding_minimum_currency,
  }

  const funding_maximum_option = {
    label: fiats.find((fiat) => fiat.id === grant?.funding_maximum_currency)?.symbol,
    value: grant?.funding_maximum_currency,
  }

  console.log({ funding_minimum_option, funding_maximum_option })

  let {
    funding_maximum_currency,
    funding_minimum_currency,
    active,
    content,
    created_at,
    updated_at,
    ...existingGrantData
  } = grant

  const prefetchedGrant = {
    ...existingGrantData,
    funding_minimum_currency: funding_minimum_currency && funding_minimum_option,
    funding_maximum_currency: funding_maximum_currency && funding_maximum_option,
    grant_blockchains: grant_blokchain_options,
    grant_categories: grant_category_options,
    grant_use_cases: grant_use_case_options,
  } as GrantSchema & Pick<Database['public']['Tables']['grants']['Row'], 'slug' | 'id'>

  console.log({ grant })

  // console.log({ blockchains, blockchainsError })

  return (
    <>
      <Modal
        title="Log in to edit a grant"
        description="Please create an account or log into your existing account to edit a grant."
        primaryButtonLabel="Login"
        primaryButtonLink="/sign-in"
      />
      <GrantForm
        grant={prefetchedGrant}
        title="Edit a Grant"
        description="Edit an existing grant"
        blockchains={blockchains}
        categories={categories}
        use_cases={use_cases}
        fiats={fiats}
      />
    </>
  )
}

export default EditGrant
