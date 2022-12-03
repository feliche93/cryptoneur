import Image from "next/image";

export default function CompanyCloud() {
  const companies = [
    {
      name: "Priceloop",
      logo: "/logos/priceloop.png",
    },
    {
      name: "N26",
      logo: "/logos/n26.png",
    },
    {
      name: "Bertelsmann Stiftung",
      logo: "/logos/bertelsmann-stiftung.png",
    },
    {
      name: "Deutsche Bank",
      logo: "/logos/deutsche-bank.png",
    },
    {
      name: "Monitor Deloitte",
      logo: "/logos/monitor-deloitte.png",
    },
    {
      name: "PwC",
      logo: "/logos/pwc.svg",
    },
    {
      name: "CryptoTicker",
      logo: "/logos/cryptoticker.png",
    },
  ];

  return (
    <div className="">
      <div className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:pt-16 lg:px-8">
        <p className="text-center text-base font-semibold uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-wider">
          Companies I worked for
        </p>
        <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 lg:mt-8">
          {companies.map((company, index) => (
            <div
              key={index}
              className="col-span-1 flex justify-center p-5 bg-base-100 rounded-lg"
            >
              <Image
                className="max-h-12 object-contain"
                width={300}
                height={100}
                src={company.logo}
                alt={company.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
