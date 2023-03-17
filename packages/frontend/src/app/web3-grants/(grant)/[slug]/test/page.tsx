import directus from '@lib/directus'
import { getAssetURL } from '@lib/utils'

const TestPage = async () => {
  const data = await directus.items('web3_grants').readByQuery({
    fields: ['*.*.*', 'logo.*'],
    limit: 1,
  })

  if (!data || !data.data || !data.data[0] || !data.data[0].logo) {
    return <div>Not found</div>
  }

  return (
    <>
      <a href={getAssetURL(data?.data[0].logo)}>{getAssetURL(data?.data[0].logo.id)}</a>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export default TestPage
