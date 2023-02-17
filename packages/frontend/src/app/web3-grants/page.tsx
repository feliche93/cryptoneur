import { Faq } from '@components/web3-grants/Faq'
import { Features } from '@components/web3-grants/Features'
import { FoundersNote } from '@components/web3-grants/FoundersNote'
import { Hero } from '@components/web3-grants/Hero'
import { SecondCta } from '@components/web3-grants/SecondCta'
import { Testimonials } from '@components/web3-grants/Testimonials'

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
  )
}
