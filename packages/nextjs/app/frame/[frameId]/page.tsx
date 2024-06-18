import { getFrameById } from "../../api/frame/[id]/route";
import { FrameMetadataType, getFrameMetadata } from "@coinbase/onchainkit/frame";

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
