import { GrantsTable } from '@/components/tables/grants'
import { SGetGrantsParams, TGetGrantsParams, getGrants } from '@/data/grants'

export default async function GrantsTablePage({
  searchParams,
}: {
  searchParams: TGetGrantsParams
}) {
  const parsedSearchParams = SGetGrantsParams.parse(searchParams)

  const grantsTableData = getGrants(parsedSearchParams)

  return (
    <>
      {/* <pre>{JSON.stringify(parsedSearchParams, null, 2)}</pre> */}
      <GrantsTable dataPromise={grantsTableData} />
    </>
  )
}
