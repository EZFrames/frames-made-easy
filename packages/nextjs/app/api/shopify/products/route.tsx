import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { getShopifyProducts } from "~~/services/shopify/fetchProducts";

// get all frames
export async function GET() {
  const products = await getShopifyProducts();
  const responseBody = JSON.stringify(products);

  return new NextResponse(responseBody, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
