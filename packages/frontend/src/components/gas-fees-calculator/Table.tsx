import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Table({
  selectedCurrency,
  usedGas,
  selectedGasPrice,
  networkPrices,
}) {
  return (
    <div className="mt-8 flex flex-col">
      {/* Desktop */}
      <div className="hidden sm:block -my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-base-300">
              <thead className="bg-base-300">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-base-content sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-base-content"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-base-content"
                  >
                    Token
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-base-content"
                  >
                    Gas Used
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-base-content"
                  >
                    Gas Price
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-base-content"
                  >
                    Current Cost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300 bg-base-100">
                {networkPrices.map((network) => (
                  <tr key={network?.website}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <Image
                            className="h-10 w-10 object-contain"
                            src={network.image}
                            height={40}
                            width={40}
                            alt={network.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-base-content">
                            {network?.name}
                          </div>
                          <a
                            target={"_blank"}
                            href={network?.website}
                            rel="noopener noreferrer"
                            className="text-base-content/80 hover:text-primary"
                          >
                            {network?.website}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-base-content/80">
                      <span
                        className={classNames(
                          network.type === "Layer 1"
                            ? "bg-accent text-accent-content"
                            : network.type === "Sidechain"
                            ? "bg-primary text-primary-content"
                            : "bg-secondary text-secondary-content",
                          "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        )}
                      >
                        {network?.type}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-base-content/80">
                      <div className="text-sm text-base-content font-semibold">
                        {network.symbol}
                      </div>
                      <div className="text-sm text-base-content/80">
                        {
                          network.tokenPrice[
                            selectedCurrency.toLocaleLowerCase()
                          ]
                        }{" "}
                        {selectedCurrency}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-3 py-4 text-sm ">
                      {usedGas}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-base-content/80">
                      <div className="text-sm capitalize text-base-content font-semibold">
                        {selectedGasPrice}
                      </div>
                      <div className="text-sm text-base-content/80">
                        {network.gasPrice[selectedGasPrice]}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-base-content">
                      {(
                        (network.tokenPrice[
                          selectedCurrency.toLocaleLowerCase()
                        ] *
                          usedGas *
                          network.gasPrice[selectedGasPrice]) /
                        10 ** 9
                      ).toFixed(4)}{" "}
                      {selectedCurrency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <table className="block sm:hidden mx-auto divide-y divide-base-300">
        <thead className="bg-base-300 rounded-lg">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-bold text-base-content/80 uppercase tracking-wider"
            >
              Calculation
            </th>
          </tr>
        </thead>
        <tbody className="bg-base-100 divide-y divide-base-300">
          {networkPrices.map((network) => (
            <tr key={network.website}>
              <td className="px-2 py-4">
                <div className="grid grid-cols-2 gap-2">
                  {/* Image and Network */}
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Image
                        src={network.image}
                        alt={network.name}
                        width={50}
                        height={50}
                        className="object-contain aspect-square"
                      ></Image>
                    </div>
                    <div className="ml-4 space-y-2">
                      <div className="text-sm font-medium text-base-content">
                        {network.name}
                      </div>
                      <span
                        className={classNames(
                          network.type === "Layer 1"
                            ? "bg-accent text-accent-content"
                            : network.type === "Sidechain"
                            ? "bg-primary text-primary-content"
                            : "bg-secondary text-secondary-content",
                          "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        )}
                      >
                        {network.type}
                      </span>
                    </div>
                  </div>
                  {/* Calculation Details */}
                  <div className="space-y-1">
                    <div className="px-2 text-sm uppercase text-base-content text-left">
                      {network.symbol}{" "}
                      <span className="font-semibold">
                        {network.tokenPrice[
                          selectedCurrency.toLocaleLowerCase()
                        ].toFixed(2)}{" "}
                        {selectedCurrency}
                      </span>
                    </div>
                    <div className="px-2 text-sm uppercase text-base-content">
                      Gas Price{" "}
                      <span className="font-semibold">
                        {network.gasPrice[selectedGasPrice]}
                      </span>
                    </div>
                    <div className="px-2 text-sm uppercase text-base-content">
                      Gas Used <span className="font-semibold">{usedGas}</span>
                    </div>
                    <div className="px-2 border border-primary bg-primary/10 rounded-full max-h-fit py-1 max-w-fit text-sm uppercase text-base-content">
                      Cost{" "}
                      <span className="font-semibold">
                        {(
                          (network.tokenPrice[
                            selectedCurrency.toLocaleLowerCase()
                          ] *
                            usedGas *
                            network.gasPrice[selectedGasPrice]) /
                          10 ** 9
                        ).toFixed(4)}{" "}
                        {selectedCurrency}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
