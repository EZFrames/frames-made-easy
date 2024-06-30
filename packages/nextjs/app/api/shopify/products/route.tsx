import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { NextRequest } from "next/server";
import { getShopifyProducts } from "~~/services/shopify/fetchProducts";

// get all frames
export async function POST(request: NextRequest) {
  const req = request as NextRequest;
  const body = await req.json();
  const { storeName, apiKey } = body;
  const products = await getShopifyProducts(storeName, apiKey);
  const responseBody = JSON.stringify(products);

  return new NextResponse(responseBody, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
