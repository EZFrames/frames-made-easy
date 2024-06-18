import { getFrameById } from "../api/frame/[id]/route";

export async function generateMetadata({ params }: any) {
  const frameId = params.frameId;
  const frame = getFrameById(frameId);
  return {
    title: "zizzamia.xyz",
    // @ts-ignore
    other: {
      ...frame,
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
