import { NextRequest, NextResponse } from "next/server";
import Journey from "~~/model/journey";
import connectDB from "~~/services/connectDB";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const journey_id = params.id;
  const journey = await Journey.findById(journey_id);
  if (!journey) {
    return new NextResponse(JSON.stringify({ message: "journey not found" }), { status: 404 });
  }
  return new NextResponse(JSON.stringify(journey));
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const journey_id = params.id;
  const payload = await req.json();
  const journey = await Journey.findByIdAndUpdate(journey_id, payload, { new: true });
  if (!journey) {
    return new NextResponse(JSON.stringify({ message: "journey not found" }), { status: 404 });
  }
  return new NextResponse(JSON.stringify(journey));
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const journey_id = params.id;
  const journey = await Journey.findByIdAndDelete(journey_id);
  if (!journey) {
    return new NextResponse(JSON.stringify({ message: "journey not found" }), { status: 404 });
  }
  return new NextResponse(JSON.stringify(journey));
}
