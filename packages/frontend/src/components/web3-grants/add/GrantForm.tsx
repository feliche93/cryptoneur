'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { FC, useEffect } from 'react'

export interface GrantFormProps {
  grant?: any
}
export const GrantForm: FC<GrantFormProps> = ({ grant }) => {
  const pathname = usePathname()

  useEffect(() => {
    // console.log('GrantForm mounted')
    // console.log({ localStorage })
    // console.log(Object.keys(localStorage))
    // clear localStorage item where key starts with FORM_DATA
    // Object.keys(localStorage)
    //   .filter((key) => key.startsWith('FORM_DATA'))
    //   .forEach((key) => {
    //     console.log({ key })
    //     localStorage.removeItem(key)
    //   })
  }, [])

  // console.log({ pathname })
  let tallyUrl = '/web3-grants/add'
    ? 'https://tally.so/embed/m6D0VN?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1'
    : 'https://tally.so/embed/mOQgD7?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&edit=true'

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
        onLoad={() => {
          const iframe = document.querySelector('iframe[data-tally-src]')

          console.log('Script has loaded')
          console.log(localStorage)
        }}
      ></Script>
      <div className="mx-auto max-w-5xl">
        <iframe
          data-tally-src={tallyUrl}
          loading="lazy"
          width="100%"
          height="1697"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Add a new grant"
        ></iframe>
      </div>
    </>
  )
}
