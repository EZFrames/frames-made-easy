import { NextRequest, NextResponse } from "next/server";
import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit";
import Analytics from "~~/model/analytics";
import Order from "~~/model/order";
import connectDB from "~~/services/connectDB";
import { createAttestation, getFrameAtServer, getJourneyById } from "~~/services/frames";
import { Journey } from "~~/types/commontypes";
import { warn } from "console";
import { myAddress } from "~~/constants";

const storeAnalytics = async (body: FrameRequest, state: any) => {
  const analyticsEntry = new Analytics({
    journeyId: state?.journey_id || "",
    frameId: state?.frame_id || "",
    fid: body.untrustedData.fid,
    buttonClicked: body.untrustedData.buttonIndex || 0,
    inputtedText: body.untrustedData.inputText || "",
    timestamp: body.untrustedData.timestamp,
  });
  await analyticsEntry.save();
  console.log(analyticsEntry);
};

// scripts to create frames + journey
// orders schema + orders
// get price and quantity for each order
// create attestation for each order

async function getResponse(req: NextRequest): Promise<NextResponse> {
  await connectDB();
  const url = req.nextUrl.pathname;
  const frameId = url.replace(`/api/orchestrator`, "");
  const body = await req.json();
  console.log("body", body);
  let state;
  if (body.untrustedData?.state && typeof body.untrustedData.state === "string") {
    console.log("Parsing State");
    state = JSON.parse(decodeURIComponent(body.untrustedData?.state as string));

  }
  const journeyId = state?.journey_id || "";
  const journey: Journey = await getJourneyById(journeyId);

  if (typeof body.untrustedData?.transactionId === "string" && body.untrustedData.transactionId.trim() !== "") {
    const txnId = body.untrustedData.transactionId;
    createAttestation({
      txnId: txnId,
      productId: state.journey_id as string,
      seller: state.journey.walletAddress as string || myAddress,
      quantity: String(state.journey.quantity) || "",
      amount: String(state.journey.price) || "",
      buyer: String(body.untrustedData.fid),
    });
  }
  let stateUpdate;
  if (state && typeof state === "object") {
    console.log("in HERE");

    // Creating Analytics for the frame asynchronously
    storeAnalytics(body, state).catch(err => console.error("Error Saving Analytics", err));

    // Adding State for Button Press and Inputted Text on last frame
    state.frame_id = frameId;
    stateUpdate = {
      ...state,
      [`${frameId}ButtonPressed`]: body.untrustedData.buttonIndex,
      [`${frameId}InputtedText`]: body.untrustedData.inputText,
    };
  }

  const dbFrame = await getFrameAtServer(frameId);
  if (!dbFrame) {
    return new NextResponse(JSON.stringify({ message: "Frame not found" }), { status: 404 });
  }
  const nextFrame = dbFrame.frameJson;
  if (state && typeof state === "object") {
    nextFrame.state = {
      ...stateUpdate,
      journey,
    };
  }

  return new NextResponse(getFrameHtmlResponse(nextFrame));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
