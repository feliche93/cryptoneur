'use client'

import { useSupabase } from '@components/supabase-provider'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/AlertDialog'
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
