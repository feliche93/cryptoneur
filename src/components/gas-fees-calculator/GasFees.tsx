"use client";

import Image from "next/image";
import React, { useState } from "react";
import CurrencyInput from "./CurrencyInput";
import FeesForm from "./FeesForm";
import FeesFormCard from "./FeesFormCard";
import GasPriceRadio from "./GasPriceRadio";
import Table from "./Table";
import UsedGasInput from "./UsedGasInput";

export default function GasFees() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [usedGas, setUsedGas] = useState(21000);
  const [selectedGasPrice, setSelectedGasPrice] = useState("standard");

  return (
    <>
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
      />
      <div className="mt-10 flex items-center  justify-center">
        <a href="https://zapper.fi/" target="_blank" rel="noreferrer">
          <Image
            className="object-center rounded-lg"
            src="/logos/power-zap-black.svg"
            alt="Powered by Zapper"
            width={200}
            height={50}
          />
        </a>
      </div>
    </>
  );
}
