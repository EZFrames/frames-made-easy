import { FrameMetadataType, getFrameMetadata } from "@coinbase/onchainkit";
import { getFrameById } from "~~/app/api/orchestrator/[frameId]/route";

export async function generateMetadata({ params }: any) {
  const frameId = params.frameId;
  const frame = getFrameById(frameId);
  return {
    title: "zizzamia.xyz",
    other: {
      ...getFrameMetadata(frame as FrameMetadataType),
    },
  };
}

export default function Page() {
  return (
    <>
      <h1>zizzamia.xyz</h1>
    </>
  );
}
