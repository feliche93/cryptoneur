import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function GasPriceRadio({ setSelectedGasPrice }) {
  // console.log(selectedGasPrice)
  const gasPriceOption = ["standard", "fast", "instant"];

  return (
    <div className="col-span-1 sm:col-span-1">
      <label
        htmlFor="gas-input"
        className="block text-sm font-medium text-gray-700"
      >
        Transaction Speed
      </label>
      <fieldset className="mt-2">
        <legend className="sr-only">Notification method</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {gasPriceOption.map((option) => (
            <div key={option} className="flex items-center">
              <input
                id={option}
                onChange={() => setSelectedGasPrice(option)}
                name="gas-price-option"
                type="radio"
                defaultChecked={option === "standard"}
                className="focus:ring-primary-focus h-4 w-4 text-primary border-base-200"
              />
              <label
                htmlFor={option}
                className="capitalize ml-3 block text-sm font-medium"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
