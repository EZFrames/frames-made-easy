import { NextRequest, NextResponse } from "next/server";
import Analytics from "~~/model/analytics";
import connectDB from "~~/services/connectDB";

type DateFilter = {
  $gte?: Date;
  $lte?: Date;
};

export async function GET(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const frameId = searchParams.get("frameId");
  const journeyId = searchParams.get("journeyId");
  const dateFilter: DateFilter = {};
  if (startDate) {
    dateFilter.$gte = new Date(startDate);
  }
  const query: any = {};
  if (startDate) {
    query.createdAt = dateFilter;
  }
  if (frameId) {
    query.frameId = frameId;
  }
  if (journeyId) {
    query.journeyId = journeyId;
  }
  const distinctUsers = await Analytics.distinct("fid", query);
  return new NextResponse(JSON.stringify({ uniqueFids: distinctUsers.length }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
