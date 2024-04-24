import { db } from '@/lib/db'
import { categories } from '@/schema'
import { unstable_cache } from 'next/cache'

export const getCachedCategoriesOptions = unstable_cache(
  async () => {
    const result = await db
      .select({
        label: categories.name,
        value: categories.id,
      })
      .from(categories)

    return result
  },
  ['getCachedCategoriesOptions'],
  {
    tags: ['getCachedCategoriesOptions'],
  },
)
