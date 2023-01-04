import { ArrowRightCircleIcon, FaceFrownIcon } from '@heroicons/react/24/outline'
import { FC } from 'react'

export interface NoInfoProps {}
export const NoInfo: FC<NoInfoProps> = () => {
  return (
    <>
      <button
        type="button"
        className="border-base-content-300 relative block w-full rounded-lg border-2 border-dashed p-2 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-focus focus:ring-offset-2"
      >
        <div className="flex flex-wrap items-center justify-center text-base-content/80">
          <ArrowRightCircleIcon className="mr-2 h-5 w-5" />
          <span className="block text-sm font-medium ">No info provided yet, contribute!</span>
        </div>
      </button>
    </>
  )
}
