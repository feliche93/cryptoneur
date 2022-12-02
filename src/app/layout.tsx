import { NextSeo } from "next-seo";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Used to be added by default, now we need to add manually */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <NextSeo
        useAppDir={true}
        // facebook={{ appId: '1234567890' }}
        // themeColor="#73fa97"
        titleTemplate="Cryptoneur | %s"
      />
      <body className="bg-base-200">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
