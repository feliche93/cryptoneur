import CurrencyInput from '@components/gas-fees-calculator/CurrencyInput'
import FeesForm from '@components/gas-fees-calculator/FeesForm'
import FeesFormCard from '@components/gas-fees-calculator/FeesFormCard'
import GasPriceRadio from '@components/gas-fees-calculator/GasPriceRadio'
import GitcoinGrant from '@components/gas-fees-calculator/GitcoinGrant'
import Header from '@components/gas-fees-calculator/Header'
import ShareButtons from '@components/gas-fees-calculator/ShareButtons'
import Table from '@components/gas-fees-calculator/Table'
import UsedGasInput from '@components/gas-fees-calculator/UsedGasInput'
import { Banner } from '@components/shared/Banner'
import { fetchFiatRates, fetchGasPrices, networks } from '@lib/gas-fees-calculator'
import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { useState } from 'react'

const GasFeesCalculator: NextPage = ({ networkPrices }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [selectedGasPrice, setSelectedGasPrice] = useState('standard')
  const [usedGas, setUsedGas] = useState(21000)

  return (
    <>
      <NextSeo
        title="Gas Fees Calculator (Multi Currency, Network & Txn Types)"
        description="Calculate gas fees in your local currency for different transaction types on Mainnet, Arbitrum, Optimism, Binance Smart Chain, Avalanche, Polygon, Gnosis, Celo, Moonriver, Fantom and Harmony."
        openGraph={{
          url: 'https://www.cryptoneur.xyz',
          title: 'Gas Fees Calculator (Multi Currency, Network & Txn Types)',
          description:
            'Calculate gas fees in your local currency for different transaction types on Mainnet, Arbitrum, Optimism, Binance Smart Chain, Avalanche, Polygon, Gnosis, Celo, Moonriver, Fantom and Harmony.',
          images: [
            {
              url: 'https://www.cryptoneur.xyz/screenshots/gas-fees-calculator-screenshot.png',
              width: 1928,
              height: 906,
              alt: 'Gas Fees Calculator (Multi Currency & Network)',
              type: 'image/jpeg',
            },
          ],
        }}
      />
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
            <CurrencyInput
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
            />
          </FeesFormCard>
          <FeesFormCard
            title="Used Gas"
            description="Every transaction uses gas. Pick a common transaction type or enter a custom amount of gas used."
          >
            <UsedGasInput usedGas={usedGas} setUsedGas={setUsedGas} />
          </FeesFormCard>
          <FeesFormCard
            title="Gas Price"
            description="Gas fees are paid in each network's native currency."
          >
            <GasPriceRadio setSelectedGasPrice={setSelectedGasPrice} />
          </FeesFormCard>
        </FeesForm>

        <Table
          selectedCurrency={selectedCurrency}
          usedGas={usedGas}
          selectedGasPrice={selectedGasPrice}
          networkPrices={networkPrices}
        />
        <div className="mt-10 flex items-center  justify-center">
          <a href="https://zapper.fi/" target="_blank" rel="noreferrer">
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
      <Banner />
    </>
  )
}

// get static props
export async function getStaticProps() {
  const [gasPrices, fiatRates] = await Promise.all([fetchGasPrices(), fetchFiatRates()])

  let networkPrices = networks.map((network, index) => {
    const gasPrice = gasPrices[index]

    const tokenPrice = fiatRates[network.coinGeckoId]

    return {
      ...network,
      gasPrice,
      tokenPrice,
    }
  })

  return {
    props: {
      networkPrices,
    },
    revalidate: 60 * 5, // Every 5 minutes
  }
}

export default GasFeesCalculator
