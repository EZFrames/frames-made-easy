import { useEffect, useMemo, useState } from "react";
import { useProductJourney } from "~~/providers/ProductProvider";
import { getFrameById } from "~~/services/frames";
import { Frame } from "~~/types/commontypes";

function FrameSidebar() {
  const { frames: dbFrames } = useProductJourney();
  const [frames, setFrames] = useState<Frame[] | undefined>(undefined);
  useEffect(() => {
    if (dbFrames) {
      Promise.all(dbFrames.map(frame => getFrameById(frame)))
        .then(data => setFrames(data))
        .catch(error => console.error("Error fetching frames:", error));
    }
  }, [dbFrames]);
  if (!frames) return null;
  return (
    <div className="bg-white flex flex-col gap-2">
      {frames.map((frame, index) => (
        <div key={index} className="border-2 border-black">
          <h3>{frame.name}</h3>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={frame.frameJson.image?.src} alt={frame.name} />
        </div>
      ))}
    </div>
  );
}

export default FrameSidebar;
