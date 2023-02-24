import { currencies } from '@/lib/gas-fees-calculator'
import CurrencyInput from '@components/gas-fees-calculator/CurrencyInput'
import { FeesForm } from '@components/gas-fees-calculator/FeesForm'
import { FeesFormCard } from '@components/gas-fees-calculator/FeesFormCard'
import { GasPriceRadio } from '@components/gas-fees-calculator/GasPriceRadio'
import { GitcoinGrant } from '@components/gas-fees-calculator/GitcoinGrant'
import { Header } from '@components/gas-fees-calculator/Header'
import { ShareButtons } from '@components/gas-fees-calculator/ShareButtons'
import { Table } from '@components/gas-fees-calculator/Table'
import { UsedGasInput } from '@components/gas-fees-calculator/UsedGasInput'
import { fetchFiatRates, fetchGasPrices, networks } from '@lib/gas-fees-calculator'
import image1 from '@public/gas-fees-calculator/ogImag1.jpg'
import image2 from '@public/gas-fees-calculator/ogImage2.jpg'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const revalidate = 300

export const metadata = {
  title: 'Gas Fees Calculator (Multi Currency, Network & Txn Types)',
  description:
    'Calculate gas fees in your local currency for different transaction types on Mainnet, Arbitrum, Optimism, Binance Smart Chain, Avalanche, Polygon, Gnosis, Celo, Moonriver, Fantom and Harmony.',
  openGraph: {
    url: 'https://www.cryptoneur.xyz/gas-fees-calculator',
    title: 'Gas Fees Calculator (Multi Currency, Network & Txn Types)',
    description:
      'Calculate gas fees in your local currency for different transaction types on Mainnet, Arbitrum, Optimism, Binance Smart Chain, Avalanche, Polygon, Gnosis, Celo, Moonriver, Fantom and Harmony.',
    images: [
      {
        url: image1.src,
        width: image1.width,
        height: image1.height,
        alt: 'Gas Fees Calculator (Multi Currency, Network & Txn Types)',
      },
      {
        url: image2.src,
        width: image2.width,
        height: image2.height,
        alt: 'Gas Fees Calculator (Multi Currency, Network & Txn Types)',
      },
    ],
    type: 'website',
  },
}

const GasFeesCalculator = async () => {
  const [gasPrices, fiatRates] = await Promise.all([fetchGasPrices(), fetchFiatRates()])

  if (!gasPrices || !fiatRates) {
    notFound()
  }

  let networkPrices = networks.map((network, index) => {
    const gasPrice = gasPrices[index]

    const tokenPrice = fiatRates[network.coinGeckoId]

    return {
      ...network,
      gasPrice,
      tokenPrice,
    }
  })

  return (
    <>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Header />
        <GitcoinGrant />
        <ShareButtons
          size={38}
          title={'Found the calculator helpful? Share it with others:'}
          shareTitle={
            'Calculate gas fees in your local currency for different transaction types on Mainnet, Arbitrum, Binance Smart Chain, Avalanche, Polygon, Fantom and Harmony.'
          }
          shareUrl={'https://www.cryptoneur.xyz/gas-fees-calculator'}
        />
        <FeesForm>
          <FeesFormCard
            title="Local Currency"
            description="Select the currency you want the fees to be displayed in."
          >
            <CurrencyInput currencies={currencies} />
          </FeesFormCard>
          <FeesFormCard
            title="Used Gas"
            description="Every transaction uses gas. Pick a common transaction type or enter a custom amount of gas used."
          >
            <UsedGasInput />
          </FeesFormCard>
          <FeesFormCard
            title="Gas Price"
            description="Gas fees are paid in each network's native currency."
          >
            <GasPriceRadio />
          </FeesFormCard>

          <Table networkPrices={networkPrices} />
        </FeesForm>

        <div className="mt-10 flex items-center  justify-center">
          <a
            href="https://zapper.fi/?utmsource=cryptoneur.xyz&utmmedium=gas-fees-calcualtor"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              className="rounded-lg object-center"
              src="/logos/power-zap-black.svg"
              alt="Powered by Zapper"
              width={200}
              height={50}
            />
          </a>
        </div>
      </div>
    </>
  )
}

export default GasFeesCalculator
