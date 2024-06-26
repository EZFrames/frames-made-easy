import FrameRender from "./FrameRenderer";
import { FrameMetadataType } from "@coinbase/onchainkit";

type FrameRenderProps = {
  frames: FrameMetadataType[];
};

function FrameSidebar({ frames }: FrameRenderProps) {
  return (
    <div className="bg-white flex flex-col gap-2">
      {frames.map((frame, index) => (
        <div key={index} className="border-2 border-black">
          <FrameRender frame={frame} />
        </div>
      ))}
    </div>
  );
}

export default FrameSidebar;
