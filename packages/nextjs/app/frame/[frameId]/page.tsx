import { FrameMetadataType, getFrameMetadata } from "@coinbase/onchainkit";
import { Metadata } from "next";
import { APP_URL } from "~~/constants";

type Props = {
  params: { frameId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const id = params.frameId;

  try {
    const response = await fetch(`${APP_URL}/api/frame/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return {
      title: "Frames Made by Frames made easy!",
      description: "Frames Made by Frames made easy!",
      other: {
        ...getFrameMetadata(data.frameJson as FrameMetadataType),
      },
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
export default function Page() {
  return (
    <>
      <h1>Frames Check this on warpcast</h1>
    </>
  );
}
