import "server-only";
import axios from 'axios';

const API_KEY = process.env.ZAPPER_API_KEY;
const apiUrl = 'https://api.zapper.fi/v2';

const currencies = [
  "USD",
  "EUR",
  "JPY",
  "GBP",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "HKD",
  "NZD",
  "SEK",
  "KRW",
  "SGD",
  "NOK",
  "MXN",
  "INR",
  "RUB",
  "ZAR",
  "TRY",
  "BRL",
  "TWD",
  "DKK",
  "PLN",
  "THB",
  "IDR",
  "HUF",
  "CZK",
  "ILS",
  "CLP",
  "PHP",
  "AED",
  "COP",
  "SAR",
  "MYR",
  "RON",
];

const networks = [
  {
    network: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    coinGeckoId: 'ethereum',
    website: 'https://ethereum.org/',
    image: '/networks/ethereum_logo.png',
    type: 'Layer 1',
  },
  {
    network: 'arbitrum',
    symbol: 'ETH',
    name: 'Arbitrum One',
    coinGeckoId: 'ethereum',
    website: 'https://offchainlabs.com/',
    image: '/networks/arbitrum_one_logo.jpeg',
    type: 'Layer 2',
  },
  {
    network: 'optimism',
    symbol: 'ETH',
    name: 'Optimism',
    coinGeckoId: 'ethereum',
    website: 'https://optimism.io/',
    image: '/networks/optimism_logo.jpeg',
    type: 'Layer 2',
  },
  {
    network: 'binance-smart-chain',
    symbol: 'BNB',
    name: 'Binance Smart Chain',
    coinGeckoId: 'binancecoin',
    website: 'https://www.binance.org/en/smartChain',
    image: '/networks/binance_smart_chain_logo.png',
    type: 'Sidechain',
  },
  {
    network: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    coinGeckoId: 'avalanche-2',
    website: 'https://www.avax.network/',
    image: '/networks/avalanche_logo.png',
    type: 'Sidechain',
  },
  {
    network: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    coinGeckoId: 'matic-network',
    website: 'https://hermez.io/',
    image: '/networks/polygon_logo.png',
    type: 'Sidechain',
  },
  {
    network: 'gnosis',
    name: 'Gnosis',
    symbol: 'XDAI',
    coinGeckoId: 'xdai',
    website: 'https://www.xdaichain.com/',
    image: '/networks/gnosis_logo.png',
    type: 'Sidechain',
  },
  {
    network: 'celo',
    name: 'Celo',
    symbol: 'CELO',
    coinGeckoId: 'celo',
    website: 'https://celo.org/',
    image: '/networks/celo_logo.png',
    type: 'Sidechain',
  },
  {
    network: 'moonriver',
    name: 'Moonriver',
    symbol: 'MOVR',
    coinGeckoId: 'moonriver',
    website: 'https://moonbeam.network/networks/moonriver/',
    image: '/networks/moonriver_logo.png',
    type: 'Sidechain',
  },
  {
    network: 'fantom',
    symbol: 'FTM',
    name: 'Fantom',
    coinGeckoId: 'fantom',
    website: 'https://fantom.foundation/',
    image: '/networks/fantom_logo.png',
    type: 'Sidechain',
  },
  {
    network: 'harmony',
    symbol: 'ONE',
    name: 'Harmony',
    coinGeckoId: 'harmony',
    website: 'https://www.harmony.one/',
    image: '/networks/harmony_logo.png',
    type: 'Sidechain',
  },
];

const fetchFiatRates = async () => {

  let ids = networks.map(network => network.coinGeckoId).join(',');

  try {
    const res = await axios({
      method: 'get',
      url: 'https://api.coingecko.com/api/v3/simple/price',
      params: {
        ids,
        vs_currencies: currencies.join(','),
      },
    });

    const data = res.data;

    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchGasPrices = async () => {
  try {
    const requests = Promise.all(
      networks.map(async ({ network }) => {
        const gasPriceResponse = await axios.get(`${apiUrl}/gas-prices`, {
          params: { network, api_key: API_KEY },
        });

        const data = gasPriceResponse.data;

        return data;
      })
    );

    let data = await requests;

    return data;

  } catch (e) {
    console.log(e);
  }
};

export {
  fetchFiatRates,
  fetchGasPrices,
  networks,
  currencies
}