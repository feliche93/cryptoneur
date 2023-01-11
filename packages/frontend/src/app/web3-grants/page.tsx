import Calendar from '@/components/home/Calendar'
import CompanyCloud from '@/components/home/CompanyCloud'
import Skills from '@/components/home/Skills'
import WebsiteStats from '@/components/home/WebsiteStats'
import CategoryFilters from '@components/web3-grants/CategoryFilters'
import { Features } from '@components/web3-grants/Features'
import { Hero } from '@components/web3-grants/Hero'
import { Testimonials } from '@components/web3-grants/Testimonials'

export default function Web3Grants() {
  return (
    <>
      <Hero />
      {/* <Testimonials /> */}
      <Features />
    </>
  )
}
