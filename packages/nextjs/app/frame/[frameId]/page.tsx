import { FrameMetadataType, getFrameMetadata } from "@coinbase/onchainkit";
import { getFrameById } from "~~/services/frames";

export async function generateMetadata({ params }: any) {
  const frameId = params.frameId;
  const frame = getFrameById(frameId);
  return {
    title: "Frames Made by Frames made easy!",
    other: {
      ...getFrameMetadata(frame as FrameMetadataType),
    },
  };
}

export default function Page() {
  return (
    <>
      <h1>Frames Check this on warpcast</h1>
    </>
  );
}
