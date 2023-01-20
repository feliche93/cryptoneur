import { GraidentAvatar } from '@components/shared/GradientAvatar'
import { createServerClient } from '@utils/supabase-server'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

export const SecondCta: FC = async () => {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('grants')
    .select('id,name,logo')
    .in('id', [11, 2, 17, 15, 19, 14, 1, 6, 20])

  // console.log({ ...data })

  const avatarsRowOne = [...data?.slice(0, 5)]

  const avatarsRowTwo = [...data?.slice(5, 9)]

  return (
    <div className="flex flex-col items-center py-8 sm:py-12">
      {/* Mobile Happy Users */}
      <div className="flex flex-col items-center space-y-8 sm:hidden ">
        <div className="avatar-group  space-x-10 ">
          {avatarsRowOne.slice(0, 3).map((avatar, i) => (
            <div key={i} className="avatar">
              <GraidentAvatar image={avatar?.logo} size={64} alt={avatar?.name} />
            </div>
          ))}
        </div>
        <div className="avatar-group space-x-10">
          {avatarsRowTwo.slice(0, 2).map((avatar, i) => (
            <div key={i} className="avatar">
              <GraidentAvatar image={avatar?.logo} size={64} alt={avatar?.name} />
            </div>
          ))}
        </div>
      </div>
      {/* Desktop Happy Users */}
      <div className="hidden flex-col items-center space-y-8 sm:flex ">
        <div className="avatar-group  space-x-12 md:space-x-20">
          {avatarsRowOne.map((avatar, i) => (
            <div key={i} className="avatar">
              <GraidentAvatar image={avatar?.logo} size={64} alt={avatar?.name} />
            </div>
          ))}
        </div>
        <div className="avatar-group space-x-12 md:space-x-20">
          {avatarsRowTwo.map((avatar, i) => (
            <div key={i} className="avatar">
              <GraidentAvatar image={avatar?.logo} size={64} alt={avatar?.name} />
            </div>
          ))}
        </div>
      </div>
      {/* Reiterate Velue */}
      <div className="mx-auto flex max-w-none flex-col items-center px-4 py-8 text-center">
        <h3 className=" bg-gradient-to-r from-primary to-base-content bg-clip-text text-4xl font-bold tracking-tight text-base-content text-transparent sm:max-w-2xl sm:text-6xl md:max-w-3xl">
          Unlock Funding for Your Web3 Project
        </h3>
        <p className="max-w-none pt-8 font-normal text-base-content/80 sm:max-w-xs md:max-w-lg">
          <span className=" italic text-base-content/80">
            &quot;Web3 grants are a powerful tool for driving innovation in the crypto space by
            providing funding and resources to blockchain projects.{' '}
          </span>
          They foster collaboration, networking and community building within the crypto
          ecosystem&quot;
        </p>
      </div>
      <Link
        className="btn-primary btn-md btn w-10/12 sm:w-fit sm:btn-lg"
        href={'/web3-grants/search'}
      >
        Explore Grants
      </Link>
    </div>
  )
}
