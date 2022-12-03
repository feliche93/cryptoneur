import React from "react";

export default function Header() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-5 sm:pt-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-wide uppercase">
          Gas Fees Calculator
        </h2>
        <p className="mt-1 text-3xl font-extrabold sm:text-4xl sm:tracking-tight lg:text-4xl">
          Sick of Paying too high gas fees?
        </p>
        <p className="max-w-4xl mt-5 mx-auto text-lg text-base-content/80">
          Start calculating gas fees for the biggest networks at different
          transaction speeds in your own local currency for a variety of
          transcations.
        </p>
      </div>
    </div>
  );
}
