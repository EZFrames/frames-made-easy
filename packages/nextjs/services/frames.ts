import { initJourneyWithFrames } from "./frames/initScript";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { APP_URL, myAddress } from "~~/constants";
import Order from "~~/model/order";
import { Frame, Journey } from "~~/types/commontypes";

export const getFrameById = async (id: string) => {
  try {
    const response = await fetch(`/api/frame/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const getFrameAtServer = async (id: string) => {
  try {
    const response = await fetch(`${APP_URL}/api/frame/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const removeUrl = (url: string) => {
  if (!url) return "";
  return url.replace(`${APP_URL}/api/orchestrator/`, "");
};

export const createFrame = async (frame: Omit<Frame, "_id">) => {
  try {
    const response = await fetch(`/api/frame`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(frame),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createJourney = async (journey: Partial<Journey>) => {
  try {
    const response = await fetch(`/api/journey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(journey),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const newJourney = await initJourneyWithFrames(
      data._id as string,
      journey.price as string,
      journey.desc as string,
      journey.image as string,
    );
    return newJourney;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const saveFrame = async (frame: Frame) => {
  try {
    const response = await fetch(`/api/frame/${frame._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(frame),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

export async function createAttestation({ txnId, seller, buyer, amount, quantity, productId }: {
  txnId: string;
  seller: string;
  buyer: string;
  amount: string;
  quantity: string;
  productId: string;
}) {
  console.log("createAttestation", txnId, seller, buyer, amount, quantity, productId);
  if (!txnId || txnId === "") {
    return;
  }
  const eas = new EAS("0x4200000000000000000000000000000000000021");
  const provider = new ethers.JsonRpcProvider("https://base-sepolia.infura.io/v3/847856edbfc14f50a4782dce0fa77ce5");
  const signer = new ethers.Wallet("c04f2876f3691d44fdba3592bf800c05516d419f10ac269a7a565c21dfda57fa", provider);
  eas.connect(signer);
  const schemaUID = "0x6cf920b46db9fc89b78efe8c06f77f1d169ab43faec920161e4c3247daff3717";
  const schemaEncoder = new SchemaEncoder(
    "string seller,string buyer,string amount,string quantity,string txHash,string productId",
  );
  const encodedData = schemaEncoder.encodeData([
    { name: "seller", value: seller, type: "string" },
    { name: "buyer", value: buyer, type: "string" },
    { name: "amount", value: amount, type: "string" },
    { name: "quantity", value: quantity, type: "string" },
    { name: "txHash", value: txnId, type: "string" },
    { name: "productId", value: productId, type: "string" },
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
  const attestation = await tx.wait();
  const NewOrder = new Order({
    fid: buyer as string,
    journeyId: productId as string,
    walletAddress: seller || myAddress,
    quantity: quantity || 0,
    price: amount || 0,
    txnId: txnId,
    attestation: attestation,
  });
  NewOrder.save();
  console.log("attestation", attestation);
  return attestation;
}
export const saveJourney = async (journey: Partial<Journey>) => {
  try {
    const response = await fetch(`/api/journey/${journey._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(journey),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};


export const getJourneyById = async (id: string) => {
  if (id === "") return;
  try {
    const response = await fetch(`${APP_URL}/api/journey/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }
  catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
