import  { EAS, SchemaEncoder }  from "@ethereum-attestation-service/eas-sdk";

const easContractAddress = "0x4200000000000000000000000000000000000021";
const schemaUID = "0x9df58a994ebd1a1d5d35b6cc9a8e417d5cbc1d4d8cd94f1b3431f71793fb43da";

const eas = new EAS(easContractAddress);

// Signer must be an ethers-like signer.
await eas.connect(signer);

// Initialize SchemaEncoder with the schema string
const schemaEncoder = new SchemaEncoder("string frame_url,address customer_wallet,string[] line_items,string amount_total,string payment_transaction_url");
const encodedData = schemaEncoder.encodeData([
	{ name: "frame_url", value: "", type: "string" } // url of the tx origin frame  
	{ name: "customer_wallet", value: "0x0000000000000000000000000000000000000000", type: "address" } // customer wallet address 
	{ name: "line_items", value: [], type: "string[]" } // line items for shopify POST data: "variant_id": 447654529, "quantity": 1
	{ name: "amount_total", value: "", type: "string" } // amount total in string - include currency
	{ name: "payment_transaction_url", value: "", type: "string" } // basescan url for the tx
]);

const tx = await eas.attest({
	schema: schemaUID,
	data: {
		recipient: "0x0000000000000000000000000000000000000000", // the owner of the frame
		expirationTime: 0,
		revocable: false, // Be aware that if your schema is not revocable, this MUST be false
		data: encodedData,
	},
});

const newAttestationUID = await tx.wait();

console.log("New attestation UID:", newAttestationUID);