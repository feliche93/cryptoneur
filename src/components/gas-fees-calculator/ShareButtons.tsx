"use client";

import React from "react";
import {
  RedditShareButton,
  RedditIcon,
  WhatsappIcon,
  WhatsappShareButton,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";

type Props = {
  title: string;
  size: number;
  shareTitle: string;
  shareUrl: string;
};

export default function ShareButtons(props: Props) {
  const { title, size, shareTitle, shareUrl } = props;
  return (
    <div className="pt-5 pb-10 space-y-4">
      <h2 className="text-center text-base-content/80 text-xs">{title}</h2>
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
  );
}
