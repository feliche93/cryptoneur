'use client'

import Script from 'next/script'
import { FC } from 'react'

export interface GrantFormProps {}
export const GrantForm: FC<GrantFormProps> = () => {
  const baseUrl =
    'https://tally.so/embed/mOQgD7?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1'
  const params = {
    name: 'Grant Name',
  }

  const baseUrlWithParams = `${baseUrl}&${new URLSearchParams(params).toString()}`

  console.log('baseUrlWithParams', baseUrlWithParams)

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
          data-tally-src="https://tally.so/embed/mOQgD7?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
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
