import { Database } from '@/lib/database.types'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

export const createBrowserClient = () => createBrowserSupabaseClient<Database>()
