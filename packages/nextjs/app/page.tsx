import type { NextPage } from "next";
import { Banner } from "~~/components/Banner";

const Home: NextPage = () => {
  return (
    <div className="flex items-center flex-col flex-grow pt-10 page">
      <Banner />
    </div>
  );
};

export default Home;
// "use client"
// import type { NextPage } from "next";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { Address } from "~~/components/scaffold-eth";
// import { ENTRYPOINT_ADDRESS_V06, createSmartAccountClient } from "permissionless";
// import { privateKeyToSimpleSmartAccount } from "permissionless/accounts";
// import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
// import { createPublicClient, encodeFunctionData, http, parseEther } from "viem";
// import { baseSepolia } from "viem/chains";
// import { ethers } from "ethers";
// import Link  from "next/link";
// import { EAS, SchemaEncoder, SchemaRegistry,  }from "@ethereum-attestation-service/eas-sdk";

// const Home: NextPage =  () => {


//   async function lfg() {

//     const eas = new EAS("0x4200000000000000000000000000000000000021");
//     const provider = new ethers.JsonRpcProvider("https://base-sepolia.infura.io/v3/847856edbfc14f50a4782dce0fa77ce5")
//     const signer = new ethers.Wallet("c04f2876f3691d44fdba3592bf800c05516d419f10ac269a7a565c21dfda57fa", provider);
//     eas.connect(signer);
//     const schemaEncoder = new SchemaEncoder("address seller,address buyer,uint256 amount,uint256 quantity,bytes32 txHash,string productId");
// const encodedData = schemaEncoder.encodeData([
// 	{ name: "seller", value: "0x0000000000000000000000000000000000000000", type: "address" },
// 	{ name: "buyer", value: "0x0000000000000000000000000000000000000000", type: "address" },
// 	{ name: "amount", value: "0", type: "uint256" },
// 	{ name: "quantity", value: "0", type: "uint256" },
// 	{ name: "txHash", value: "", type: "bytes32" },
// 	{ name: "productId", value: "", type: "string" },
// ]);
//     const schemaUID = "0x3ca31d9c24a48e437eba25cb423d9a873a751511c70dc0b2a8fb4c9a8d45b506"
//     const tx = await eas.attest({
//   schema: schemaUID,
//   data: {
//     recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
//     expirationTime: BigInt(0),
//     revocable: true, // Be aware that if your schema is not revocable, this MUST be false
//     data: encodedData,
//   },
// });

// const newAttestationUID = await tx.wait();

// console.log("New attestation UID:", newAttestationUID);
//     // const offchain = await eas.getOffchain();
//     //  console.log(offchain);




// // const offchainAttestation = await offchain.signOffchainAttestation({
// //   recipient: '0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165',
// //   // Unix timestamp of when attestation expires. (0 for no expiration)
// // expirationTime: BigInt('0'),
// //   // Unix timestamp of current time
// //   time: BigInt(1671219636),
// //   revocable: true, // Be aware that if your schema is not revocable, this MUST be false

// //   nonce: BigInt('0'),
// //   schema: "0x3ca31d9c24a48e437eba25cb423d9a873a751511c70dc0b2a8fb4c9a8d45b506",
// //   refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
// //   data: encodedData,
// // }, signer);




// // console.log("New attestation UID:", offchainAttestation);

// const rpcUrl = "https://api.developer.coinbase.com/rpc/v1/base-sepolia/YoFvJm3qNGMvTrtaqg0fbB20fBTqXxAP";

// const publicClient = createPublicClient({
//   transport: http(rpcUrl),
// });

// const simpleAccount = await privateKeyToSimpleSmartAccount(publicClient, {
//   // Set this to your private key
//   privateKey: "0xc04f2876f3691d44fdba3592bf800c05516d419f10ac269a7a565c21dfda57fa",
//   factoryAddress: "0x9406Cc6185a346906296840746125a0E44976454",
//   entryPoint: ENTRYPOINT_ADDRESS_V06,
// });
// const cloudPaymaster = createPimlicoPaymasterClient({
//   chain: baseSepolia,
//   transport: http(rpcUrl),
//   entryPoint: ENTRYPOINT_ADDRESS_V06,
// });

// const smartAccountClient = createSmartAccountClient({
//   account: simpleAccount,
//   chain: baseSepolia,
//   bundlerTransport: http(rpcUrl),
//   // IMPORTANT: Set up Cloud Paymaster to sponsor your transaction
//   middleware: {
//     sponsorUserOperation: cloudPaymaster.sponsorUserOperation,
//   },
// });
// const abi = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "initialOwner",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "ECDSAInvalidSignature",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "length",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "ECDSAInvalidSignatureLength",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "bytes32",
// 				"name": "s",
// 				"type": "bytes32"
// 			}
// 		],
// 		"name": "ECDSAInvalidSignatureS",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "allowance",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "needed",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "ERC20InsufficientAllowance",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "sender",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "balance",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "needed",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "ERC20InsufficientBalance",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "approver",
// 				"type": "address"
// 			}
// 		],
// 		"name": "ERC20InvalidApprover",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "receiver",
// 				"type": "address"
// 			}
// 		],
// 		"name": "ERC20InvalidReceiver",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "sender",
// 				"type": "address"
// 			}
// 		],
// 		"name": "ERC20InvalidSender",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			}
// 		],
// 		"name": "ERC20InvalidSpender",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "deadline",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "ERC2612ExpiredSignature",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "signer",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "ERC2612InvalidSigner",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "currentNonce",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "InvalidAccountNonce",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "InvalidShortString",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnableInvalidOwner",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnableUnauthorizedAccount",
// 		"type": "error"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "string",
// 				"name": "str",
// 				"type": "string"
// 			}
// 		],
// 		"name": "StringTooLong",
// 		"type": "error"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Approval",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [],
// 		"name": "EIP712DomainChanged",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "previousOwner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "newOwner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "OwnershipTransferred",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "uint256",
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Transfer",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "DOMAIN_SEPARATOR",
// 		"outputs": [
// 			{
// 				"internalType": "bytes32",
// 				"name": "",
// 				"type": "bytes32"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			}
// 		],
// 		"name": "allowance",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "approve",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "balanceOf",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "decimals",
// 		"outputs": [
// 			{
// 				"internalType": "uint8",
// 				"name": "",
// 				"type": "uint8"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "eip712Domain",
// 		"outputs": [
// 			{
// 				"internalType": "bytes1",
// 				"name": "fields",
// 				"type": "bytes1"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "name",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "version",
// 				"type": "string"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "chainId",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "verifyingContract",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "bytes32",
// 				"name": "salt",
// 				"type": "bytes32"
// 			},
// 			{
// 				"internalType": "uint256[]",
// 				"name": "extensions",
// 				"type": "uint256[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "mint",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "name",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "nonces",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "owner",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "spender",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "value",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "deadline",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint8",
// 				"name": "v",
// 				"type": "uint8"
// 			},
// 			{
// 				"internalType": "bytes32",
// 				"name": "r",
// 				"type": "bytes32"
// 			},
// 			{
// 				"internalType": "bytes32",
// 				"name": "s",
// 				"type": "bytes32"
// 			}
// 		],
// 		"name": "permit",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "renounceOwnership",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "symbol",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "totalSupply",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transfer",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "value",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transferFrom",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "newOwner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "transferOwnership",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "seller",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "qt",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "trf",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	}
// ]
// const num1 = parseEther('5');
// const num2 = BigInt('1');
// const callData = encodeFunctionData({
//   abi: abi,
//   functionName: "trf",
//   args: ['0x027fe3f132403c1b59ddaba14b576d15865f69c0', num1, num2],
// });
//     const txHash = await smartAccountClient.sendTransaction({
//   account: smartAccountClient.account,
//   to: "0x059ee9bde2aff94d0e6ad396ec0ec7d27bff6dc8",
//   data: callData,
//   value: 0n,
//     });
//  console.log(txHash)
// console.log("✅ Transaction successfully sponsored!");
// console.log(`🔍 View on Etherscan: https://sepolia.basescan.org/tx/${txHash}`);
// }
//   return (
//     <>
//       <div className="flex items-center flex-col flex-grow pt-10">
//         <div className="px-5">
//           <h1 className="text-center">
//             <span className="block text-2xl mb-2">Welcome to</span>
//             <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
//           </h1>
//           <div className="flex justify-center items-center space-x-2">
//             <p className="my-2 font-medium">Connected Address:</p>
     
//           </div>
//           <p className="text-center text-lg">
//             Get started by editing{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/nextjs/app/page.tsx
//             </code>
//           </p>
//           <p className="text-center text-lg">
//             Edit your smart contract{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               YourContract.sol
//             </code>{" "}
//             in{" "}
//             <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
//               packages/hardhat/contracts
//             </code>
//           </p>
//         </div>

//         <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
//           <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <BugAntIcon className="h-8 w-8 fill-secondary" />
//               <p>
//                 Tinker with your smart contract using the{" "}
//                 <Link href="/debug" passHref className="link">
//                   Debug Contracts
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//             <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
//               <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
//                <>
//         <button onClick={lfg}> Send txn </button>
//         </>
//               <p>
//                 Explore your local transactions with the{" "}
//                 <Link href="/blockexplorer" passHref className="link">
//                   Block Explorer
//                 </Link>{" "}
//                 tab.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>

//   );
// };
// export default Home;
