import { NextRequest, NextResponse } from "next/server";
import { FrameMetadataType, FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit";
import Analytics from "~~/model/analytics";
import connectDB from "~~/services/connectDB";
import { getFrameById } from "~~/services/frames";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  await connectDB();
  const body: FrameRequest = await req.json();
  const state = JSON.parse(decodeURIComponent(body.untrustedData.state as string));
  // Create Analytics for the frame asynchronously
  const analyticsEntry = new Analytics({
    journeyId: state?.journeyId || "",
    frameId: state?.frameId || "",
    fid: body.untrustedData.fid,
    buttonClicked: body.untrustedData.buttonIndex || 0,
    inputtedText: body.untrustedData.inputText || "",
    timestamp: body.untrustedData.timestamp,
  });
  await analyticsEntry.save();
  return new NextResponse(getFrameHtmlResponse(getFrameById(1) as FrameMetadataType));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
