'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'
import { DollarSign } from 'lucide-react'

export function WebsiteForSaleToast() {
  useEffect(() => {
    // Show toast after 5 seconds
    const timer = setTimeout(() => {
      toast(
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-500" />
            <span className="font-medium">Website For Sale</span>
          </div>
          <div className="mt-2 text-sm text-foreground/80">
            Please{' '}
            <a
              href="mailto:felix.vemmer@gmail.com?subject=Interested%20in%20buying%20Cryptoneur.xyz&body=Hi%20Felix%2C%0A%0AI%20am%20interested%20in%20buying%20Cryptoneur.co%20for%20%24X.%0A%0ABest%20regards%2C%0A"
              className="text-primary font-medium hover:underline"
            >
              contact me
            </a>{' '}
            if you're interested in buying.
          </div>
        </div>,
        {
          duration: 15000, // 15 seconds
          position: 'bottom-left',
          className: "max-w-md",
          style: {
            paddingBottom: '12px',
            paddingTop: '12px'
          }
        }
      )
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return null // This component doesn't render anything
} 