import { NextRequest, NextResponse } from "next/server";
import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit";
import { APP_URL } from "~~/constants";
import Analytics from "~~/model/analytics";
import connectDB from "~~/services/connectDB";
import { getFrameAtServer } from "~~/services/frames";

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
  const url = req.nextUrl.pathname;
  const frameId = url.replace(`/api/orchestrator`, "");
  const body = await req.json();
  const state = JSON.parse(decodeURIComponent(body.untrustedData.state as string));

  // Creating Analytics for the frame asynchronously
  storeAnalytics(body, state).catch(err => console.error("Error Saving Analytics", err));
  // Adding State for Button Press and Inputted Text on last frame
  const stateUpdate = {
    ...state,
    [`${frameId}ButtonPressed`]: body.untrustedData.buttonIndex,
    [`${frameId}InputtedText`]: body.untrustedData.inputText,
  };
  const dbFrame = await getFrameAtServer(frameId);
  if (!dbFrame) {
    return new NextResponse(JSON.stringify({ message: "Frame not found" }), { status: 404 });
  }
  const nextFrame = dbFrame.frameJson;
  nextFrame.state = {
    ...stateUpdate,
  };
  return new NextResponse(getFrameHtmlResponse(nextFrame));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
