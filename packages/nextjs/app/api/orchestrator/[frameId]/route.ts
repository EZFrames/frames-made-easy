import { NextRequest, NextResponse } from "next/server";
import { FrameMetadataType, FrameRequest, getFrameHtmlResponse, getFrameMessage } from "@coinbase/onchainkit";
import { getFrameById } from "~~/services/frames";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid } = await getFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  return new NextResponse(getFrameHtmlResponse(getFrameById(1) as FrameMetadataType));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
