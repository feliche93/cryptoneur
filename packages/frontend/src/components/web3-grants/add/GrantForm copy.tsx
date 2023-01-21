'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { FC } from 'react'

export interface GrantFormProps {
  grant?: any
}
export const GrantForm: FC<GrantFormProps> = ({ grant }) => {
  const pathname = usePathname()

  // console.log({ pathname })

  let tallyUrl = 'https://tally.so/embed/mOQgD7?description="Felix'
  // 'https://tally.so/embed/mOQgD7?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1'

  // const params = {
  //   name: 'Grant Name',
  // }

  // if (grant) {
  //   // console.log({ grant })
  //   tallyUrl = `${tallyUrl}&${new URLSearchParams(params).toString()}`
  // }

  // console.log({ tallyUrl })

  return (
    <>
      <Script
        src="https://tally.so/widgets/embed.js"
        // on load call Tally.loadEmbeds();
        // onLoad={() => {
        //   console.log('loaded')
        //   const Tally = window.Tally
        //   Tally.loadEmbeds()
        // }
      ></Script>
      <iframe
        data-tally-src="https://tally.so/embed/mOQgD7?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&test_name=Felix"
        loading="lazy"
        width="100%"
        height="2752"
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        title="Add a new grant"
      ></iframe>
    </>
  )
}
