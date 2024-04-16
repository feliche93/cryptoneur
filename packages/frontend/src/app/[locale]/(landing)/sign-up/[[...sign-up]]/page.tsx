import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex h-full flex-col items-center pt-32">
      <SignUp />
    </div>
  )
}
