import { createBrowserClient } from '@utils/supabase-browser'

const PlaygroundPage = async () => {
  const supabase = createBrowserClient()
  let query = supabase.from('grants').select('id,name,blockchains!inner(id)')

  query = query.in('blockchains.id', ['1'])
  query = query.limit(10)

  const { data, error } = await query

  return (
    <>
      <pre>{JSON.stringify(error, null, 2)}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export default PlaygroundPage
