'use client'

export default function Home() {
  return (
    <>
      <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text pb-8 text-center text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
        Mint one of the jokes as a memory!
      </h1>
      <div className="flex justify-center">
        <iframe
          src="https://gateway.ipfscdn.io/ipfs/Qmcine1gpZUbQ73nk7ZGCcjKBVFYXrEtqrhujXk3HDQ6Nn/erc721.html?contract=0x072b40d8Cd1Ae294d2A0E64Ca9dF670861d7C788&chainId=137"
          width="600px"
          height="600px"
          //   style="max-width:100%;"
          //   frameborder="0"
        ></iframe>
      </div>
    </>
  )
}
