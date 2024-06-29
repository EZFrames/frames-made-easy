import { useEffect, useState } from "react";
import { DEFAULT_FRAME } from "~~/constants";
import { useProductJourney } from "~~/providers/ProductProvider";
import { getFrameById } from "~~/services/frames";
import { Frame } from "~~/types/commontypes";

function FrameSidebar() {
  const { frames: dbFrames, frame, setFrame, setCurrentFrame, createFrame } = useProductJourney();
  const [frames, setFrames] = useState<Frame[] | undefined>(undefined);
  const [currentFrameId, setCurrentFrameId] = useState<string>(frame?._id as string);
  useEffect(() => {
    if (dbFrames) {
      Promise.all(dbFrames.map(frame => getFrameById(frame)))
        .then(data => setFrames(data))
        .catch(error => console.error("Error fetching frames:", error));
    }
  }, [dbFrames]);
  useEffect(() => {
    setCurrentFrameId(frame?._id as string);
  }, [frame]);
  const onCreate = async () => {
    await createFrame.mutateAsync({
      name: "Frame",
      frameJson: DEFAULT_FRAME,
    });
  };
  if (!frames) return null;
  return (
    <div className="bg-white flex flex-col gap-2 p-4 h-full">
      <div className="flex flex-wrap gap-2 h-[600px] overflow-y-scroll">
        {frames.map((frame, index) => (
          <div
            key={index}
            className={`border-2 p-2 w-full h-40 flex flex-col items-center justify-center ${
              currentFrameId === frame._id ? "border-blue-500" : "border-black"
            }`}
            onClick={() => {
              setCurrentFrameId(frame._id as string);
              setFrame(frame);
              setCurrentFrame(frame.frameJson);
            }}
          >
            <h3 className="text-center text-sm">{frame.name}</h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={frame.frameJson.image?.src} alt={frame.name} className="w-32 h-auto" />
          </div>
        ))}
      </div>
      <div className="mt-auto flex justify-center w-full">
        <button onClick={onCreate} className="btn btn-primary w-full">
          Create
        </button>
      </div>
    </div>
  );
}

export default FrameSidebar;
