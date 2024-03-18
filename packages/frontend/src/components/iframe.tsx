import Script from 'next/script'
import { FC } from 'react'

export interface IframeProps {
  src: string
  className?: string
}

export const Iframe: FC<IframeProps> = ({ src, className }) => {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        maxWidth: '100%',
      }}
    >
      <Script id="iframeContainer" strategy="afterInteractive">
        {`
          var iframe = document.createElement('iframe');
          iframe.src = "${src}";
          iframe.style.position = "absolute";
          iframe.style.top = "0";
          iframe.style.left = "0";
          iframe.style.width = "100%";
          iframe.style.height = "100%";
          iframe.style.border = "none";
          iframe.allowTransparency = "true";
          iframe.allowFullscreen = "true";
          document.getElementById('iframeContainer').appendChild(iframe);
        `}
      </Script>
      <div id="iframeContainer"></div>
    </div>
  )
}
