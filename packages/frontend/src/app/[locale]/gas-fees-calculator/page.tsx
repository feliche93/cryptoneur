// import { GitcoinGrant } from '@components/gas-fees-calculator/gitcoin-grant'
// import { Header } from '@components/gas-fees-calculator/header'
// import { ShareButtons } from '@components/gas-fees-calculator/share-buttons'
// import { getMetaData } from '@lib/directus'

import CurrencyInput from '@/components/gas-fees-calculator/currency-input'
import { GasPriceRadio } from '@/components/gas-fees-calculator/gas-price-radio'
import { GitcoinGrant } from '@/components/gas-fees-calculator/gitcoin-grant'
import { ShareButtons } from '@/components/gas-fees-calculator/share-buttons'
import { Table } from '@/components/gas-fees-calculator/table'
import { UsedGaseInput } from '@/components/gas-fees-calculator/used-gas-input'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { getCurrencies, getTransactionTypes } from '@/data/gas-fees-calculator'
import { currencies, getNetworkPrices } from '@/lib/gas-fees-calculator'
import Image from 'next/image'

// export const dynamic = 'error'
export const revalidate = 300

// export const generateMetadata = async ({ params }: { params: { slug: string; lang: string } }) => {
//   const { lang } = params

//   const metaData = await getMetaData({ id: 1, lang })

//   return metaData
// }
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

export interface TxnTypes {
  data: Datum[]
}

export interface Datum {
  gas: number
  translations: TranslationTxnType[]
}

export interface TranslationTxnType {
  id: number
  gas_fees_calculator_txn_types_id: number
  languages_code: string
  name: string
  source: string
}

const GasFeesCalculator = async ({ params: { lang } }: { params: { lang: string } }) => {
  const currenciesPromise = getCurrencies()
  const txnTypesPromise = getTransactionTypes()
  const networkPricesPromise = getNetworkPrices()

  const [currenciesDb, txnTypes, networkPrices] = await Promise.all([
    currenciesPromise,
    txnTypesPromise,
    networkPricesPromise,
  ])

  const filteredCurrencies = currenciesDb.filter((currency) => currencies.includes(currency.symbol))

  return (
    <>
      <div className="container py-12 relative">
        <PageHeader className="flex flex-col items-center">
          <h2 className="text-lg text-center sm:text-left py-2 font-bold">Gas Fees Calculator</h2>
          <PageHeaderHeading className="text-center sm:text-left">
            Sick of Paying too high gas fees?
          </PageHeaderHeading>
          <PageHeaderDescription className="text-center sm:text-left">
            Start calculating gas fees for the biggest networks at different transaction speeds in
            your own local currency for a variety of blockchain transactions.
          </PageHeaderDescription>
        </PageHeader>

        <GitcoinGrant />
        <ShareButtons
          size={38}
          title={'Found the calculator helpful? Share it with others:'}
          shareTitle={'Cryptoneur.xyz Gas Fees Calculator'}
          shareUrl={'https://www.cryptoneur.xyz/gas-fees-calculator'}
        />

        <div className="grid gap-4">
          <CurrencyInput currencies={filteredCurrencies} />
          <UsedGaseInput txnTypes={txnTypes} />
          <GasPriceRadio />
        </div>

        <Table
          labelHeaderName={'Blockchain'}
          labelHeaderType={'Type'}
          labelHeaderToken={'Token'}
          labelHeaderGasUsed={'Gas Used'}
          labelHeaderGasPrice={'Gas Price'}
          labelHeaderGasCurrentCost={'Gas Current Cost'}
          networkPrices={networkPrices}
        />
      </div>
      <div className="mt-10 flex flex-col gap-2 items-center justify-center">
        <div className="text-sm text-muted-foreground">Sponsored by</div>
        <a
          href="https://zapper.fi/?utmsource=cryptoneur.xyz&utmmedium=gas-fees-calcualtor"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            alt="Zapper Logo"
            className="rounded-lg object-center m-1 p-2 dark:bg-primary"
            src="/logos/zapper-logo.png"
            width={200}
            height={100}
          />
        </a>
      </div>
    </>
  )
}

export default GasFeesCalculator
