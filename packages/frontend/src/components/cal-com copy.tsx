'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export function CalCom() {
  const { resolvedTheme } = useTheme()

  console.log(resolvedTheme)

  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi()
      cal('ui', {
        styles: { branding: { brandColor: '#111827' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
        theme: resolvedTheme === 'dark' ? 'dark' : 'light',
      })
    })()
  }, [])

  return (
    <Cal
      className="my-8"
      calLink="felix-vemmer/30-minute-google-hangout-chat"
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{ layout: 'month_view' }}
    />
  )
}
