'use client'

import { Link } from '@/app/navigation'
import { OrganizationSwitcher, UserButton, useAuth } from '@clerk/nextjs'
import { FC } from 'react'
import { buttonVariants } from './ui/button'

export interface AuthClerkHeaderProps {}
export const AuthClerkHeader: FC<AuthClerkHeaderProps> = () => {
  const { isLoaded, isSignedIn } = useAuth()

  if (isLoaded && !isSignedIn)
    return (
      <Link
        href="/sign-in"
        className={buttonVariants({
          variant: 'default',
          className: 'ml-2',
        })}
      >
        Sign In
      </Link>
    )
  return (
    <>
      <div className="flex flex-row gap-4 ml-2">
        <OrganizationSwitcher
          afterSelectOrganizationUrl={(organization) => {
            if (organization) {
              return `/${organization.slug}/profile`
            }
            return '/'
          }}
        />
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </>
  )
}
