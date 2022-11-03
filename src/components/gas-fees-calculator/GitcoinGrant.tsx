import Image from "next/image";
import React from "react";

type Props = {};

export default function GitcoinGrant() {
  return (
    <div>
      <a
        href="https://gitcoin.co/grants/5753/gas-fees-calculator-multi-currency-network-txn-ty"
        target={"_blank"}
        rel="noopener noreferrer"
      >
        <div className="flex flex-col items-center">
          <p className="font-bold pt-5 px-5 text-center">
            Support this public good through a Gitcoin Grant:
          </p>
          <Image
            src={"/logos/gitcoinGrant.svg"}
            height={100}
            width={300}
            alt="Gitcoin Grant"
          />
        </div>
      </a>
    </div>
  );
}
