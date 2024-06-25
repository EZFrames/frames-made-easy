import { NextRequest, NextResponse } from "next/server";
import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit";
import Analytics from "~~/model/analytics";
import connectDB from "~~/services/connectDB";
import { getFrameById } from "~~/services/frames";

const storeAnalytics = async (body: FrameRequest, state: any) => {
  const analyticsEntry = new Analytics({
    journeyId: state?.journeyId || "",
    frameId: state?.frameId || "",
    fid: body.untrustedData.fid,
    buttonClicked: body.untrustedData.buttonIndex || 0,
    inputtedText: body.untrustedData.inputText || "",
    timestamp: body.untrustedData.timestamp,
  });
  analyticsEntry.save();
};

async function getResponse(req: NextRequest): Promise<NextResponse> {
  await connectDB();
  const body: FrameRequest = await req.json();
  const state = JSON.parse(decodeURIComponent(body.untrustedData.state as string));
  const frameId = state?.frameId;
  console.log(state);
  // Creating Analytics for the frame asynchronously
  storeAnalytics(body, state).catch(err => console.error("Error Saving Analytics", err));
  // Adding State for Button Press and Inputted Text on last frame
  const stateUpdate = {
    ...state,
    [`${frameId}ButtonPressed`]: body.untrustedData.buttonIndex,
    [`${frameId}InputtedText`]: body.untrustedData.inputText,
  };
  const nextFrame = getFrameById(1);
  nextFrame.state = {
    ...stateUpdate,
  };
  return new NextResponse(getFrameHtmlResponse(nextFrame));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
