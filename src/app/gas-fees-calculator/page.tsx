import Image from "next/image";
import GitcoinGrant from "@/components/gas-fees-calculator/GitcoinGrant";
import Header from "@/components/gas-fees-calculator/Header";
import ShareButtons from "@/components/gas-fees-calculator/ShareButtons";
import Table from "@/components/gas-fees-calculator/Table";
import { NextSeo } from "next-seo";
import FeesForm from "@components/gas-fees-calculator/FeesForm";
import FeesFormCard from "@components/gas-fees-calculator/FeesFormCard";
import CurrencyInput from "@components/gas-fees-calculator/CurrencyInput";
import GasFees from "@components/gas-fees-calculator/GasFees";

export default function GasFeesCalculator({
  params: { currency, usedGas, gasPrice },
}) {
  // { params: { slug } }
  // const [currency, usedGas, gasPrice] = slug;

  // STATE
  // const [selectedGasPrice, setSelectedGasPrice] = useState("standard");
  // const [usedGas, setUsedGas] = useState(21000);

  return (
    <>
      {/* <NextSeo
        title="Gas Fees Calculator (Multi Currency, Network & Txn Types)"
        description="Calculate gas fees in your local currency for different transaction types on Mainnet, Arbitrum, Optimism, Binance Smart Chain, Avalanche, Polygon, Gnosis, Celo, Moonriver, Fantom and Harmony."
        openGraph={{
          url: "https://www.cryptoneur.xyz",
          title: "Gas Fees Calculator (Multi Currency, Network & Txn Types)",
          description:
            "Calculate gas fees in your local currency for different transaction types on Mainnet, Arbitrum, Optimism, Binance Smart Chain, Avalanche, Polygon, Gnosis, Celo, Moonriver, Fantom and Harmony.",
          images: [
            {
              url: "https://www.cryptoneur.xyz/screenshots/gas-fees-calculator-screenshot.png",
              width: 1928,
              height: 906,
              alt: "Gas Fees Calculator (Multi Currency & Network)",
              type: "image/jpeg",
            },
          ],
        }}
      /> */}
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Header />
        <GitcoinGrant />
        <ShareButtons
          size={38}
          title={"Found the calculator helpful? Share it with others:"}
          shareTitle={
            "Calculate gas fees in your local currency for different transaction types on Mainnet, Arbitrum, Binance Smart Chain, Avalanche, Polygon, Fantom and Harmony."
          }
          shareUrl={"https://www.cryptoneur.xyz/gas-fees-calculator"}
        />
        <GasFees />
      </div>
    </>
  );
}
