import { db } from '@/lib/db'
import { blockchains } from '@/schema'
import { unstable_cache } from 'next/cache'

export const getCachedBlockchainOptions = unstable_cache(
  async () => {
    const result = await db
      .select({
        value: blockchains.id,
        label: blockchains.name,
      })
      .from(blockchains)

    return result
  },
  ['getCachedBlockchainOptions'],
  {
    tags: ['getCachedBlockchainOptions'],
  },
)
