'use client'

import { usePathname, useRouter } from 'next/navigation'
import Script from 'next/script'
import { FC, useEffect } from 'react'

export interface GrantFormTallyProps {
  grant?: any
}
export const GrantFormTally: FC<GrantFormTallyProps> = ({ grant }) => {
  const pathname = usePathname()
  const router = useRouter()

  // useEffect(() => {
  //   if (pathname !== '/web3-grants/add') {
  //     router.refresh()
  //   }

  // }, [])

  // console.log({ pathname })
  let tallyUrl =
    'https://tally.so/embed/m6D0VN?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1'

  if (grant) {
    const filteredGrant = {
      ...Object.entries(grant)
        .filter(([key, value]) => value !== undefined && value !== null && value !== '')
        .reduce((result, [key, value]) => ({ ...result, [key]: value }), {}),
    }

    console.log({ ...filteredGrant })
    tallyUrl = `${tallyUrl}&${new URLSearchParams({
      edit: pathname === '/web3-grants/add' ? 'false' : 'true',
      ...filteredGrant,
    }).toString()}`
  }

  // console.log({ tallyUrl })
  return (
    <>
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          Tally.loadEmbeds();
          `,
        }}
        src="https://tally.so/widgets/embed.js"
        // onReady={() => {
        //   console.log('router refresh')
        //   router.
        // }}
      ></Script>
      <div className="mx-auto max-w-5xl">
        <iframe
          data-tally-src={tallyUrl}
          loading="lazy"
          width="100%"
          height="1697"
          scrolling="no"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Add a new grant"
        ></iframe>
      </div>
    </>
  )
}
