import { GrantForm, GrantSchema } from '@components/web3-grants/add/GrantForm'
import { Modal } from '@components/web3-grants/edit/Modal'
import { ModalWrapper } from '@components/web3-grants/edit/ModalWrapper'
import { createServerClient } from '@utils/supabase-server'
import { NextPage } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import Script from 'next/script'

const EditGrant = async ({ params: { slug } }: { params: { slug: string } }) => {
  const supabase = createServerClient()
  const { data: blockchains, error: blockchainsError } = await supabase
    .from('blockchains')
    .select('*')

  const { data: categories, error: categoriesError } = await supabase.from('categories').select('*')

  const { data: use_cases, error: useCasesError } = await supabase.from('use_cases').select('*')

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
    !use_cases
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

  grant = {
    ...grant,
    grant_blockchains: grant_blokchain_options,
    grant_categories: grant_category_options,
    grant_use_cases: grant_use_case_options,
    image: grant.logo,
  }

  console.log({ grant })

  const { data: fiats, error: fiatsError } = await supabase.from('fiats').select('*')

  // console.log({ blockchains, blockchainsError })

  return (
    <>
      <Modal
        title="Log in to add a grant"
        description="Please create an account or log into your existing account to create a grant."
        primaryButtonLabel="Login"
        primaryButtonLink="/sign-in"
      />
      <GrantForm
        grant={grant}
        title="Add a Grant"
        description="Add a grant to the Directory"
        blockchains={blockchains}
        categories={categories}
        use_cases={use_cases}
        grant_blokchains={grant_blokchains}
        grant_categories={grant_categories}
        grant_use_cases={grant_use_cases}
        fiats={fiats}
      />
    </>
  )
}

export default EditGrant
