"use client"
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { ENTRYPOINT_ADDRESS_V06, createSmartAccountClient } from "permissionless";
import { privateKeyToSimpleSmartAccount } from "permissionless/accounts";
import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { createPublicClient, encodeFunctionData, http } from "viem";
import { baseSepolia } from "viem/chains";
import { ethers } from "ethers";
import Link from "next/link";

import { useState } from "react";

const Home =  () => {
const { address: connectedAddress } = useAccount();
 const [data, setData] = useState("")

  async function lfg() {
const rpcUrl = "https://api.developer.coinbase.com/rpc/v1/base-sepolia/vgD307g2ysf5BvXO57OAi1bfmAwUBgNn";

const publicClient = createPublicClient({
  transport: http(rpcUrl),
});

const simpleAccount = await privateKeyToSimpleSmartAccount(publicClient, {
  // Set this to your private key
  privateKey: "0xc04f2876f3691d44fdba3592bf800c05516d419f10ac269a7a565c21dfda57fa",
  factoryAddress: "0x9406Cc6185a346906296840746125a0E44976454",
  entryPoint: ENTRYPOINT_ADDRESS_V06,
});
    
const cloudPaymaster = createPimlicoPaymasterClient({
  chain: baseSepolia,
  transport: http(rpcUrl),
  entryPoint: ENTRYPOINT_ADDRESS_V06,
  
});

const smartAccountClient = createSmartAccountClient({
  account: simpleAccount,
  chain: baseSepolia,
  bundlerTransport: http(rpcUrl),
  // IMPORTANT: Set up Cloud Paymaster to sponsor your transaction
  middleware: {
    sponsorUserOperation: cloudPaymaster.sponsorUserOperation,
  },
});

      const sellerAddress = "0x027fe3f132403C1B59DDAbA14B576D15865F69C0";

      let num = BigInt('5000000000000000000');
      let num2 = BigInt('1');
      console.log(num)
    console.log({ simpleAccount, smartAccountClient, rpcUrl, cloudPaymaster, publicClient })
const abi = [
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint16", name: "item", type: "uint16" },
    ],
    name: "mintTo",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
];

const callData = encodeFunctionData({
  abi: abi,
  functionName: "mintTo",
  args: [smartAccountClient.account.address, 0],
});

const txHash = await smartAccountClient.sendTransaction({
  account: smartAccountClient.account,
  to: "0x66519FCAee1Ed65bc9e0aCc25cCD900668D3eD49",
  data: callData,
  value: 0n,
});
console.log("✅ Transaction successfully sponsored!");
console.log(`🔍 View on Etherscan: https://sepolia.basescan.org/tx/${txHash}`);
}
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
     
          </div>
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
               <>
        <button onClick={lfg}> Send txn </button>
        </>
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};
export default Home;