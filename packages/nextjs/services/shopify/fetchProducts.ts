import axios from "axios";

// const config = {
//   method: "get",
//   maxBodyLength: Infinity,
//   url: "https://my-on-chain-store.myshopify.com/admin/api/2023-01/products.json",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     "X-Shopify-Access-Token": "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",
//   },
// };
export const DEFAULT_SHOPIFY_URL = "https://my-on-chain-store.myshopify.com/admin/api/2023-01/products.json";
export const DEFAULT_SHOPIFY_ACCESS_TOKEN = "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";

export const getShopifyProducts = async (url?: string, accessToken?: string) => {
  if (!url) {
    url = DEFAULT_SHOPIFY_URL;
  }
  if (!accessToken) {
    accessToken = DEFAULT_SHOPIFY_ACCESS_TOKEN;
  }
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
  };
  try {
    const response = await axios.request(config);
    return response.data.products as any[];
  } catch (error: any) {
    throw new Error(error.message);
  }
};
