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

  let tallyUrl =
    'https://tally.so/embed/mOQgD7?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1'

  if (grant) {
    const filteredGrant = {
      ...Object.entries(grant)
        .filter(([key, value]) => value !== undefined && value !== null && value !== '')
        .reduce((result, [key, value]) => ({ ...result, [key]: value }), {}),
    }

    console.log({ ...filteredGrant })
    tallyUrl = `${tallyUrl}&${new URLSearchParams({
      edit: 'true',
      ...filteredGrant,
    }).toString()}`
  }

  console.log({ tallyUrl })
  return (
    <>
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: 'Tally.loadEmbeds();',
        }}
        src="https://tally.so/widgets/embed.js"
        onLoad={() => {
          console.log('Script has loaded')
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
