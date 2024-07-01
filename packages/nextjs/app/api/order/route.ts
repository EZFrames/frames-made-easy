import { NextRequest, NextResponse } from "next/server";
import Order from "~~/model/order";
import connectDB from "~~/services/connectDB";

type DateFilter = {
  $gte?: Date;
  $lte?: Date;
};

export async function GET(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const journeyId = searchParams.get("journeyId");
  const dateFilter: DateFilter = {};
  if (startDate) {
    dateFilter.$gte = new Date(startDate);
  }
  const query: any = {};
  if (startDate) {
    query.createdAt = dateFilter;
  }
  if (journeyId) {
    query.journeyId = journeyId;
  }
  const orders = await Order.find(query);
  return new NextResponse(JSON.stringify({ orders }));
}
