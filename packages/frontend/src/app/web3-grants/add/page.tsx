import { GrantForm } from '@components/web3-grants/add/GrantForm'
import { createServerClient } from '@utils/supabase-server'

const AddGrant = async () => {
  const supabase = createServerClient()
  const { data: blockchains, error: blockchainsError } = await supabase
    .from('blockchains')
    .select('*')

  const { data: categories, error: categoriesError } = await supabase.from('categories').select('*')

  const { data: use_cases, error: useCasesError } = await supabase.from('use_cases').select('*')
  const { data: grant_blokchains, error: grantBlokchainsError } = await supabase
    .from('grant_blokchains')
    .select('*')

  const { data: grant_categories, error: grantCategoriesError } = await supabase
    .from('grant_categories')
    .select('*')

  const { data: grant_use_cases, error: grantUseCasesError } = await supabase
    .from('grant_use_cases')
    .select('*')

  const { data: fiats, error: fiatsError } = await supabase.from('fiats').select('*')

  // console.log({ blockchains, blockchainsError })

  return (
    <>
      <GrantForm
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
      {/* <GrantFormTally /> */}
    </>
  )
}

export default AddGrant
