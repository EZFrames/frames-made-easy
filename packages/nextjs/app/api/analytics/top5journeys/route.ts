import { NextResponse } from "next/server";
import Analytics from "~~/model/analytics";
import Journey from "~~/model/journey";
import connectDB from "~~/services/connectDB";

export async function GET() {
  await connectDB();
  const topJourneys = await Analytics.aggregate([
    { $group: { _id: "$journeyId", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]).exec();

  for (const journey of topJourneys) {
    const journeyBody = await Journey.findById(journey._id);
    journey.journeyName = journeyBody?.name;
  }
  return new NextResponse(JSON.stringify(topJourneys), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
