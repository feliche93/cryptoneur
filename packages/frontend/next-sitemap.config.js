module.exports = {
  siteUrl: `${process.env.VERCEL_ENV === 'development' ? `http://localhost:3000` : `https://strapi.cryptoneur.xyz`}`, // Site domain. Do not include a trailing slash!`,
  generateRobotsTxt: true, // (optional)
  exclude: [], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.VERCEL_ENV === 'development' ? `http://localhost:1337/sitemap/index.xml` : `https://strapi.cryptoneur.xyz/sitemap/index.xml`}`, // <==== Add here
    ],
  },
}