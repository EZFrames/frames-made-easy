import { NextResponse } from "next/server";
import Analytics from "~~/model/analytics";
import connectDB from "~~/services/connectDB";

export async function GET() {
  await connectDB();
  const topFrames = await Analytics.aggregate([
    { $group: { _id: "$frameId", count: { $sum: 1 } } },
    { $sort: { count: -1 } }, 
    { $limit: 5 }, 
  ]).exec();

  return new NextResponse(JSON.stringify(topFrames), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
