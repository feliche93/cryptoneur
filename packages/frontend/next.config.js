/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
    dangerouslyAllowSVG: true,
  },
  typescript: {
    ignoreBuildErrors: true,
    // serverComponentsExternalPackages: ['"@supabase/auth-helpers-nextjs'],
  },
}

module.exports = nextConfig
