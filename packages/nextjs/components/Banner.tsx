import Link from "next/link";
import { BanknotesIcon, BuildingStorefrontIcon, ChartBarIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export const Banner = () => (
  <div className="container max-w-[90%] lg:py-12 py-0 xl:max-w-7xl xl:pl-4 m-auto pt-4 pb-8 flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-0">
    <div className="space-y-2 lg:max-w-[55%] flex flex-col items-center lg:items-start">
      <div className="relative">
        <h2 className="text-3xl md:text-4xl lg:leading-[1.2] text-center lg:text-left font-bold">
          Frames Factory <br /> <p className="text-lg md:text-xl font-normal">Growth Hack for your Store</p>
        </h2>
      </div>
      <div className="text-center font-spaceMono px-1 max-w-lg lg:max-w-none lg:w-4/5 lg:px-0 lg:text-left space-y-5">
        <div className="bg-base-300 p-4 rounded-2xl">
          <p className="m-0 text-xs md:text-sm lg:text-base">
            Explore growth oppurtunities in the Web3 World by creating multiframe product journeys allowing your store
            <b> to go onchain{" "}</b>
          </p>
        </div>
        <Link
          href="/dashboard"
          className="btn btn-primary btn-md border-1 border-black hover:border-black hover:border-1 rounded-2xl px-14 font-bold shadow-none"
        >
          Get Started
        </Link>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="flex flex-col bg-base-100 p-6 rounded-3xl items-center">
        <BuildingStorefrontIcon className="h-8 w-8 fill-secondary" />
        <p className="mt-4 text-center">Manage your store and products  and <b>attest</b> order receipts using <b>EAS</b></p>
      </div>
      <div className="flex flex-col bg-base-100 p-6 rounded-3xl items-center">
        <GlobeAltIcon className="h-8 w-8 fill-secondary" />
        <p className="mt-4 text-center">Take your existing store into the web3 world with our <b>shopify integration</b></p>
      </div>
      <div className="flex flex-col bg-base-100 p-6 rounded-3xl items-center">
        <BanknotesIcon className="h-8 w-8 fill-secondary" />
        <p className="mt-4 text-center">Collect payments for orders using onchain methods for <b>USDC</b> on <b>BASE</b></p>
      </div>
      <div className="flex flex-col bg-base-100 p-6 rounded-3xl items-center">
        <ChartBarIcon className="h-8 w-8 fill-secondary" />
        <p className="mt-4 text-center">Track how each product is selling and ship changes <b>instantly</b></p>
      </div>
    </div>{" "}
  </div>
);