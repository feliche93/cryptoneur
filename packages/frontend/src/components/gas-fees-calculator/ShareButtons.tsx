'use client'

import dynamic from 'next/dynamic'
import { FC } from 'react'
export interface ShareButtonsProps {
  title: string
  size: number
  shareTitle: string
  shareUrl: string
}

const EmailIcon = dynamic(() => import('next-share').then((mod) => mod.EmailIcon), { ssr: false })
const EmailShareButton = dynamic(() => import('next-share').then((mod) => mod.EmailShareButton), {
  ssr: false,
})
const FacebookIcon = dynamic(() => import('next-share').then((mod) => mod.FacebookIcon), {
  ssr: false,
})
const FacebookShareButton = dynamic(
  () => import('next-share').then((mod) => mod.FacebookShareButton),
  { ssr: false },
)
const LinkedinIcon = dynamic(() => import('next-share').then((mod) => mod.LinkedinIcon), {
  ssr: false,
})
const LinkedinShareButton = dynamic(
  () => import('next-share').then((mod) => mod.LinkedinShareButton),
  { ssr: false },
)
const RedditIcon = dynamic(() => import('next-share').then((mod) => mod.RedditIcon), { ssr: false })
const RedditShareButton = dynamic(() => import('next-share').then((mod) => mod.RedditShareButton), {
  ssr: false,
})
const TelegramIcon = dynamic(() => import('next-share').then((mod) => mod.TelegramIcon), {
  ssr: false,
})
const TelegramShareButton = dynamic(
  () => import('next-share').then((mod) => mod.TelegramShareButton),
  { ssr: false },
)
const TwitterIcon = dynamic(() => import('next-share').then((mod) => mod.TwitterIcon), {
  ssr: false,
})
const TwitterShareButton = dynamic(
  () => import('next-share').then((mod) => mod.TwitterShareButton),
  { ssr: false },
)
const WhatsappIcon = dynamic(() => import('next-share').then((mod) => mod.WhatsappIcon), {
  ssr: false,
})
const WhatsappShareButton = dynamic(
  () => import('next-share').then((mod) => mod.WhatsappShareButton),
  { ssr: false },
)

export const ShareButtons: FC<ShareButtonsProps> = ({ title, size, shareTitle, shareUrl }) => {
  return (
    <div className="space-y-4 pt-5 pb-10">
      <h2 className="text-center text-xs text-base-content/80">{title}</h2>
      <div className="flex justify-center space-x-2">
        <RedditShareButton url={shareUrl} title={shareTitle}>
          <RedditIcon round size={size} />
        </RedditShareButton>
        <TwitterShareButton url={shareUrl} title={shareTitle}>
          <TwitterIcon round size={size} />
        </TwitterShareButton>
        <TelegramShareButton url={shareUrl} title={shareTitle}>
          <TelegramIcon round size={size} />
        </TelegramShareButton>
        <EmailShareButton url={shareUrl} title={shareTitle}>
          <EmailIcon round size={size} />
        </EmailShareButton>
        <WhatsappShareButton url={shareUrl} title={shareTitle}>
          <WhatsappIcon round size={size} />
        </WhatsappShareButton>
        <LinkedinShareButton url={shareUrl} title={shareTitle}>
          <LinkedinIcon round size={size} />
        </LinkedinShareButton>
        <FacebookShareButton url={shareUrl} title={shareTitle}>
          <FacebookIcon round size={size} />
        </FacebookShareButton>
      </div>
    </div>
  )
}
