import { NextRequest, NextResponse } from "next/server";
import Frame from "~~/model/frame";
import connectDB from "~~/services/connectDB";

// get all frames
export async function GET() {
  await connectDB();
  const frames = await Frame.find();
  return new NextResponse(JSON.stringify({ frames }));
}

// post frame
export async function POST(req: NextRequest) {
  await connectDB();
  const payload = await req.json();
  const { frameJson, name } = payload;
  const frame = new Frame({
    name,
    frameJson: frameJson,
  });
  await frame.save();
  return new NextResponse(JSON.stringify(frame));
}
