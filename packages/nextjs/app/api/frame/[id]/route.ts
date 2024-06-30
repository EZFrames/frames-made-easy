import { NextRequest, NextResponse } from "next/server";
import Frame from "~~/model/frame";
import connectDB from "~~/services/connectDB";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const frame_id = params.id;
  const frame = await Frame.findById(frame_id);
  if (!frame) {
    return new NextResponse(JSON.stringify({ message: "Frame not found" }), { status: 404 });
  }
  return new NextResponse(JSON.stringify(frame));
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const frame_id = params.id;
  const payload = await req.json();
  const frame = await Frame.findByIdAndUpdate(frame_id, payload, { new: true });
  if (!frame) {
    return new NextResponse(JSON.stringify({ message: "Frame not found" }), { status: 404 });
  }
  return new NextResponse(JSON.stringify(frame));
}

// delete frame
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const frame_id = params.id;
  const frame = await Frame.findByIdAndDelete(frame_id);
  if (!frame) {
    return new NextResponse(JSON.stringify({ message: "Frame not found" }), { status: 404 });
  }
  return new NextResponse(JSON.stringify(frame));
}
