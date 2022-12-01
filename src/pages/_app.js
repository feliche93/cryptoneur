import '../app/globals.css'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/dist/client/router';
import proilePic from '../../public/profilePic.jpg';
import { usePostHog } from 'next-use-posthog'
import Layout from "@components/layout/Layout";

export default function MyApp({ Component, pageProps }) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page)
    const router = useRouter()
    const host = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` || 'http://localhost:3000'

    usePostHog('phc_IXe7mC7sXnw988kXvNiNw4sb910x6C8CJpkdfKkPYPy', {
        api_host: 'https://app.posthog.com',
        loaded: (posthog) => {
            if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing()
        },
    })

    return getLayout(
        <>
            <Head>
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-FZ9XDW8NMK"
                />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FZ9XDW8NMK', { page_path: window.location.pathname });
            `,
                    }}
                />
            </Head>
            <DefaultSeo
                titleTemplate='Cryptoneur | %s'
                defaultTitle='Cryptoneur'
                description='Welcome to my personal website! Check out my portofolio projects, browse through my blog posts or get in touch with me for freelance work.'
                openGraph={{
                    title: 'Cryptoneur',
                    type: 'website',
                    locale: 'en_US',
                    url: `${host}${router.pathname}`,
                    site_name: 'Cryptoneur',
                    images: [
                        {
                            url: `${host}${proilePic.src}`,
                            width: proilePic.width,
                            height: proilePic.height,
                            alt: 'Cryptoneur Pfofile',
                        }]
                }}
                twitter={{
                    handle: '@FelixVemmer',
                    site: '@FelixVemmer',
                    cardType: 'summary_large_image',
                }}
            />
            <Layout>
                <Component {...pageProps} />
            </Layout>

        </>

    )
}