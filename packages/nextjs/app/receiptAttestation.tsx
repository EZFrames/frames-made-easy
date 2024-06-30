import { EAS, SchemaEncoder, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
const eas = new EAS("0x4200000000000000000000000000000000000021");
const offchain = await eas.getOffchain();
const provider = new ethers.JsonRpcProvider("https://base-sepolia.infura.io/v3/847856edbfc14f50a4782dce0fa77ce5")
// Signer must be an ethers-like signer.
const schemaUID = "0x3ca31d9c24a48e437eba25cb423d9a873a751511c70dc0b2a8fb4c9a8d45b506"
const signer = new ethers.Wallet("c04f2876f3691d44fdba3592bf800c05516d419f10ac269a7a565c21dfda57fa", provider);
const schemaEncoder = new SchemaEncoder("address seller,address buyer,uint256 amount,uint256 quantity,bytes32 txHash,string productId");
const encodedData = schemaEncoder.encodeData([
	{ name: "seller", value: "0x0000000000000000000000000000000000000000", type: "address" },
	{ name: "buyer", value: "0x0000000000000000000000000000000000000000", type: "address" },
	{ name: "amount", value: "0", type: "uint256" },
	{ name: "quantity", value: "0", type: "uint256" },
	{ name: "txHash", value: "", type: "bytes32" },
	{ name: "productId", value: "", type: "string" },
]);

const tx = await eas.attest({
  schema: schemaUID,
  data: {
    recipient: "0x0000000000000000000000000000000000000000",
    expirationTime: BigInt(0),
    revocable: true, // Be aware that if your schema is not revocable, this MUST be false
    data: encodedData,
  },
});

const newAttestationUID = await tx.wait();

console.log("New attestation UID:", newAttestationUID);

