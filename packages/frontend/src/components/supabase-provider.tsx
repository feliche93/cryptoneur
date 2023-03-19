'use client'

import type { Session } from '@supabase/auth-helpers-nextjs'
import { createContext, useContext, useState } from 'react'
import type { TypedSupabaseClient } from '../app/[lang]/layout'
import { createBrowserClient } from '../utils/supabase-browser'

type MaybeSession = Session | null

type SupabaseContext = {
  supabase: TypedSupabaseClient
  session: MaybeSession
}

// @ts-ignore
const Context = createContext<SupabaseContext>()

export default function SupabaseProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: MaybeSession
}) {
  const [supabase] = useState(() => createBrowserClient())

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => useContext(Context)
