import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web3 Grants',
  description:
    'Find the perfect funding opportunity for your web3 project with our comprehensive and constantly updated grant database. Advanced filtering options and data-driven insights increase your chances of success. Join our growing community and contribute to the database.',
  keywords:
    'web3, grants, funding, crypto, blockchain, ethereum, defi, dapp, dapps, web3 grants, grants',
  openGraph: {
    title: 'Web3 Grant Platform - Find Funding for Your Project',
    description:
      'Find the perfect funding opportunity for your web3 project with our comprehensive and constantly updated grant database. Advanced filtering options and data-driven insights increase your chances of success. Join our growing community and contribute to the database.',
    url: 'https://cryptoneur.xyz/web3-grants',
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL}${image1.src}`,
        width: image1.width,
        height: image3.height,
        alt: 'Web3 Grant Platform - Find Funding for Your Project',
      },
      {
        url: `${process.env.NEXT_PUBLIC_URL}${image2.src}`,
        width: image2.width,
        height: image2.height,
        alt: 'Web3 Grant Platform - Find Funding for Your Project',
      },
      {
        url: `${process.env.NEXT_PUBLIC_URL}${image3.src}`,
        width: image3.width,
        height: image3.height,
        alt: 'Web3 Grant Platform - Find Funding for Your Project',
      },
    ],
  },
};

export default function Web3Grants() {
  return (
    <>
      <Hero />
      <Testimonials />
      <Features />
      <Faq />
      <SecondCta />
      <FoundersNote />
    </>
  );
}
