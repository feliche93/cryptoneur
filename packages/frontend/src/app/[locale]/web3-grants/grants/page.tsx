import { GrantsTable } from '@/components/tables/grants'
import { TGetGrantsParams, getGrants } from '@/data/grants'

export default async function GrantsTablePage({
  searchParams,
}: {
  searchParams: TGetGrantsParams
}) {
  const grantsTableData = getGrants(searchParams)

  return (
    <>
      <GrantsTable dataPromise={grantsTableData} />
    </>
  )
}
