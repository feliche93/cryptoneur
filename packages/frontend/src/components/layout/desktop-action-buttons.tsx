import { useSupabase } from '@components/supabase-provider'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

export interface DeskltopActionButtonsProps {}
export const DeskltopActionButtons: FC<DeskltopActionButtonsProps> = () => {
  const { session, supabase } = useSupabase()
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log({ error })
    }
    router.refresh()
  }

  return (
    <div className="hidden md:absolute md:inset-y-0 md:right-0 md:flex md:items-center md:justify-end">
      {session ? (
        <button className="btn-outline btn-primary btn" onClick={handleLogout}>
          Log Out
        </button>
      ) : (
        <div className="space-x-2">
          <Link className="btn-primary btn" href={'/sign-in'}>
            Log In
          </Link>
          <Link className="btn-outline btn-primary btn" href={'/register'}>
            Sign Up
          </Link>
        </div>
      )}
    </div>
  )
}
