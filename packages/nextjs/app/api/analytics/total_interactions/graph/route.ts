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
  console.log(startDate, frameId, journeyId);
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
  const aggregationPipeline = [
    {
      $match: query,
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        date: "$_id",
        count: 1,
        _id: 0,
      },
    },
    {
      $sort: { date: 1 } as any,
    },
  ];
  const results = await Analytics.aggregate(aggregationPipeline).exec();
  console.log(results);
  // write a loop iterating from startDate to endDate and filling in the missing dates with 0
  return new NextResponse(JSON.stringify(results), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
