"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import Script from "next/script";
import { useEffect } from "react";

export default function Calendar() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#000000" } },
      });
    })();
  }, []);

  return (
    <div className="relative pt-16 sm:pt-24 lg:pt-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h2 className="text-base font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase">
          Book a Meeting
        </h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Interested in Working together? 🗓️
        </p>
      </div>
      <Cal
        calLink="felix-vemmer/30-minute-google-hangout-chat"
        className="pt-10 w-auto overflow-hidden"
      />
      {/* <div className="pt-10 w-full h-full overflow-scroll" id="my-cal-inline">
        <Script
          id="my-cal-inline"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
            Cal("init", {origin:"https://app.cal.com"});

            Cal("inline", {
              elementOrSelector:"#my-cal-inline",
              calLink: "felix-vemmer/30-minute-google-hangout-chat"
            });

            Cal("ui", {"theme":"light","styles":{"branding":{"brandColor":"#3182ce"}}});
            `,
          }}
        />
      </div> */}

      {/* <Cal allowtransparency="true" className='pt-12 w-full h-full overflow-hidden bg-gray-100' calLink="felix-vemmer/30-minute-google-hangout-chat" /> */}
    </div>
  );
}
