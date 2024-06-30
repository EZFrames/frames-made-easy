import { NextRequest, NextResponse } from "next/server";
import Journey from "~~/model/journey";
import connectDB from "~~/services/connectDB";

export async function GET() {
  await connectDB();
  const journeys = await Journey.find();
  return new NextResponse(JSON.stringify(journeys));
}

export async function POST(req: NextRequest) {
  await connectDB();
  const payload = await req.json();
  const journey = new Journey(payload);
  await journey.save();
  return new NextResponse(JSON.stringify(journey));
}
