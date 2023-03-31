import { currencies } from '@/lib/gas-fees-calculator'
import CurrencyInput from '@components/gas-fees-calculator/currency-input'
import { FeesForm } from '@components/gas-fees-calculator/FeesForm'
import { FeesFormCard } from '@components/gas-fees-calculator/fees-form-card'
import { GasPriceRadio } from '@components/gas-fees-calculator/GasPriceRadio'
import { GitcoinGrant } from '@components/gas-fees-calculator/gitcoin-grant'
import { Header } from '@components/gas-fees-calculator/header'
import { ShareButtons } from '@components/gas-fees-calculator/ShareButtons'
import { Table } from '@components/gas-fees-calculator/Table'
import { DirectusImage } from '@components/shared/directus-image'
import directus from '@lib/directus'
import { fetchFiatRates, fetchGasPrices, networks } from '@lib/gas-fees-calculator'
import image1 from '@public/gas-fees-calculator/ogImag1.jpg'
import image2 from '@public/gas-fees-calculator/ogImage2.jpg'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { UsedGaseInput } from '@components/gas-fees-calculator/used-gas-input'

export const runtime = 'nodejs' // 'nodejs' (default) | 'experimental-edge'

export const metadata: Metadata = {
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
        url: `${process.env.NEXT_PUBLIC_URL}${image1.src}`,
        width: image1.width,
        height: image1.height,
        alt: 'Gas Fees Calculator (Multi Currency, Network & Txn Types) UI',
      },
      {
        url: `${process.env.NEXT_PUBLIC_URL}${image2.src}`,
        width: image2.width,
        height: image2.height,
        alt: 'Gas Fees Calculator (Multi Currency, Network & Txn Types) UX',
      },
    ],
    type: 'website',
  },
}

interface Translation {
  header_title: string
  head_subtitle: string
  header_description: string
  gitcoin_title: string
  share_button_title: string
  table_header_name: string
  table_header_type: string
  table_header_token: string
  table_header_gas_used: string
  table_header_gas_price: string
  table_header_gas_current_cost: string
  share_buttons_share_title: string
  currency_input_title: string
  currency_input_description: string
  curreny_input_label: string
  used_gas_input_title: string
  gas_price_input_title: string
  used_gas_input_description: string
  gas_price_input_description: string
  used_gas_input_label_txn_type: string
  used_gas_input_label_used_gas: string
  gas_price_input_label_standard: string
  gas_price_input_label_fast: string
  gas_price_input_label_instant: string
  gas_price_input_label_transaction_speed: string
}

interface DirectusResponse {
  translations: Translation[]
  zapper_logo: {
    id: string
  }
}

const GasFeesCalculator = async ({ params: { lang } }: { params: { lang: string } }) => {
  // const [gasPrices, fiatRates] = await Promise.all([fetchGasPrices(), fetchFiatRates()])

  const fiatRates = await fetchFiatRates()

  if (!fiatRates) {
    console.log({ fiatRates })
    throw console.error('Error fetching fiat rates')
  }

  const gasPrices = await fetchGasPrices()

  if (!gasPrices) {
    console.log({ gasPrices })
    throw console.error('Error fetching gas prices')
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

  const { translations, zapper_logo } = (await directus.singleton('gas_fees_calculator').read({
    fields: ['zapper_logo.id', 'translations.*'],
    deep: {
      translations: {
        _filter: {
          languages_code: {
            _starts_with: lang,
          },
        },
      },
    },
  })) as DirectusResponse

  return (
    <>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Header lang={lang} />
        <GitcoinGrant />
        <ShareButtons
          size={38}
          title={translations[0].share_button_title}
          shareTitle={translations[0].share_buttons_share_title}
          shareUrl={'https://www.cryptoneur.xyz/gas-fees-calculator'}
        />
        <FeesForm>
          <FeesFormCard
            title={translations[0].currency_input_title}
            description={translations[0].currency_input_description}
          >
            <CurrencyInput label={translations[0].curreny_input_label} currencies={currencies} />
          </FeesFormCard>

          <FeesFormCard
            title={translations[0].used_gas_input_title}
            description={translations[0].used_gas_input_description}
          >
            <UsedGaseInput
              labelTransactionType={translations[0].used_gas_input_label_txn_type}
              labelUsedGas={translations[0].used_gas_input_label_used_gas}
            />
          </FeesFormCard>
          <FeesFormCard
            title={translations[0].gas_price_input_title}
            description={translations[0].gas_price_input_description}
          >
            <GasPriceRadio
              labelStandard={translations[0].gas_price_input_label_standard}
              labelFast={translations[0].gas_price_input_label_fast}
              labelInstant={translations[0].gas_price_input_label_instant}
              labelTransactionSpeed={translations[0].gas_price_input_label_transaction_speed}
            />
          </FeesFormCard>

          <Table
            labelHeaderName={translations[0].table_header_name}
            labelHeaderType={translations[0].table_header_type}
            labelHeaderToken={translations[0].table_header_token}
            labelHeaderGasUsed={translations[0].table_header_gas_used}
            labelHeaderGasPrice={translations[0].table_header_gas_price}
            labelHeaderGasCurrentCost={translations[0].table_header_gas_current_cost}
            networkPrices={networkPrices}
          />
        </FeesForm>
      </div>
      <div className="mt-10 flex items-center  justify-center">
        <a
          href="https://zapper.fi/?utmsource=cryptoneur.xyz&utmmedium=gas-fees-calcualtor"
          target="_blank"
          rel="noreferrer"
        >
          <DirectusImage
            className="rounded-lg object-center"
            id={zapper_logo.id}
            width={250}
            height={50}
          />
        </a>
      </div>
    </>
  )
}

export default GasFeesCalculator
