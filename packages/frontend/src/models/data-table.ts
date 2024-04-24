import { z } from 'zod'

export const STableSearchParams = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  sort: z.string().optional(),
})
