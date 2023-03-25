'use client'

import { BlockType } from '@lib/directus.types'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { FC, useEffect } from 'react'

export const BlockCalendar: FC<BlockType> = ({ lang, id }) => {
  return (
    <div className="relative pt-16 sm:pt-24 lg:pt-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-base font-semibold uppercase tracking-wider text-transparent">
          Book a Meeting
        </h2>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Interested in Working together? 🗓️
        </p>
      </div>
      <div className="w-auto overflow-hidden pt-10" id="my-cal-inline">
        <Script strategy="afterInteractive">
          {`
          (function (C, A, L) {
            let p = function (a, ar) { a.q.push(ar); };
            let d = C.document;
            C.Cal = C.Cal || function () {
              let cal = C.Cal;
              let ar = arguments;
              if (!cal.loaded) {
                cal.ns = {};
                cal.q = cal.q || [];
                d.head.appendChild(d.createElement("script")).src = A;
                cal.loaded = true;
              }
              if (ar[0] === L) {
                const api = function () { p(api, arguments); };
                const namespace = ar[1];
                api.q = api.q || [];
                typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
                return;
              }
              p(cal, ar);
            };
          })(window, "https://app.cal.com/embed/embed.js", "init");

          Cal("init", {origin:"https://app.cal.com"});

          Cal("inline", {
            elementOrSelector:"#my-cal-inline",
            calLink: "felix-vemmer/30-minute-google-hangout-chat"
          });

          Cal("ui", {"styles":{"branding":{"brandColor":"#000000"}},"hideEventTypeDetails":false});
        `}
        </Script>
      </div>
    </div>
  )

  return (
    <div className="relative pt-16 sm:pt-24 lg:pt-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-base font-semibold uppercase tracking-wider text-transparent">
          Book a Meeting
        </h2>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Interested in Working together? 🗓️
        </p>
      </div>
      <Cal
        calLink="felix-vemmer/30-minute-google-hangout-chat"
        className="w-auto overflow-hidden pt-10"
      />
    </div>
  )
}
