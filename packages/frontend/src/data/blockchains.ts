import { db } from '@/lib/db'
import { blockchains } from '@/schema'
import { unstable_cache } from 'next/cache'

export const getCachedBlockchainOptions = unstable_cache(
  async () => {
    const result = await db
      .select({
        label: blockchains.name,
        value: blockchains.id,
      })
      .from(blockchains)

    return result
  },
  ['getCachedBlockchainOptions'],
  {
    tags: ['getCachedBlockchainOptions'],
  },
)
