import { NextResponse } from "next/server";
import Analytics from "~~/model/analytics";
import connectDB from "~~/services/connectDB";

export async function GET() {
  await connectDB();
  const topFrames = await Analytics.aggregate([
    { $group: { _id: "$frameId", count: { $sum: 1 } } }, // Group by frameId and count documents
    { $sort: { count: -1 } }, // Sort by count in descending order
    { $limit: 5 }, // Limit to top 5 results
  ]).exec();

  return new NextResponse(JSON.stringify(topFrames), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
