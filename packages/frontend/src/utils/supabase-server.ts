import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { TypedSupabaseClient } from '@app/layout';

export const createServerClient: TypedSupabaseClient = () =>
    createServerComponentSupabaseClient<Database>({
        headers,
        cookies,
    });