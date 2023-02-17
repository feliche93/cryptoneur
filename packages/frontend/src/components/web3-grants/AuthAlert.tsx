'use client'

import { useSupabase } from '@components/supabase-provider'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@components/ui/AlertDialog'
import { createBrowserClient } from '@utils/supabase-browser'
import { FC, PropsWithChildren } from 'react'

export interface AuthAlertProps extends PropsWithChildren {
  open: boolean
}
export const AuthAlert: FC<AuthAlertProps> = ({ children, open }) => {
  const { supabase, session } = useSupabase()

  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You are not logged in yet</AlertDialogTitle>
            <AlertDialogDescription>Please log in before creating a grant.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Login</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
