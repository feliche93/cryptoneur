'use client'

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share'
import { FC } from 'react'
export interface ShareButtonsProps {
  title: string
  size: number
  shareTitle: string
  shareUrl: string
}
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
