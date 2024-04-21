import { db } from '@/lib/db'
import { categories } from '@/schema'
import { unstable_cache } from 'next/cache'

export const getCachedCategoriesOptions = unstable_cache(
  async () => {
    const result = await db
      .select({
        id: categories.id,
        name: categories.name,
      })
      .from(categories)

    return result
  },
  ['getCachedCategoriesOptions'],
  {
    tags: ['getCachedCategoriesOptions'],
  },
)
