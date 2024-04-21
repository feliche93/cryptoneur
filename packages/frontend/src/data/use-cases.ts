import { db } from '@/lib/db'
import { useCases } from '@/schema'
import { unstable_cache } from 'next/cache'

export const getCachedUseCasesOptions = unstable_cache(
  async () => {
    const result = await db
      .select({
        id: useCases.id,
        name: useCases.name,
      })
      .from(useCases)

    return result
  },
  ['getCachedUseCasesOptions'],
  {
    tags: ['getCachedUseCasesOptions'],
  },
)
