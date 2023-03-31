import "server-only";


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

interface Network {
  network: string;
  symbol: string;
  name: string;
  coinGeckoId: string;
  website: string;
  image: string;
  type: string;
}

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
  const ids = networks.map(network => network.coinGeckoId).join(',');
  const vsCurrencies = currencies.join(',');

  const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vsCurrencies}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching fiat rates:', error);
    return null;
  }
};


const fetchGasPrices = async () => {
  try {
    const requests = Promise.all(
      networks.map(async ({ network }) => {
        const url = `${apiUrl}/gas-prices?network=${network}&api_key=${API_KEY}`;
        const gasPriceResponse = await fetch(url,
          // { next: { revalidate: 300 } }
        );
        const data = await gasPriceResponse.json();
        return data;
      })
    );

    const data = await requests;
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
};
