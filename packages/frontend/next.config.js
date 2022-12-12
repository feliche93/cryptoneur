/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['cryptoneur-prod.s3.us-west-2.amazonaws.com', "pbs.twimg.com"],
  },
  "typescript": {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    "ignoreBuildErrors": true,
  },
}

module.exports = nextConfig
