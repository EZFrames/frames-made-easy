import { NextRequest, NextResponse } from "next/server";
import { FrameRequest, FrameTransactionResponse } from "@coinbase/onchainkit/lib/frame/types";
import { encodeFunctionData, parseEther } from "viem";
import { ABI, contract, myAddress } from "~~/constants";

export async function POST(req: NextRequest): Promise<NextResponse<FrameTransactionResponse>> {
  const body: FrameRequest = await req.json();
  const { untrustedData } = body;
  const callData = encodeFunctionData({
    abi: ABI,
    functionName: "trf",
    args: [myAddress, parseEther("5"), BigInt(untrustedData?.inputText || 1)],
  });
  
  return NextResponse.json({
    chainId: "eip155:84532",
    method: "eth_sendTransaction",
    params: {
      abi: ABI,
      to: contract,
      data: callData,
      value: "0x0",
    },
  });
}
