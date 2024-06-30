import { useEffect, useState } from "react";
import { useProductJourney } from "~~/providers/ProductProvider";
import { getFrameById } from "~~/services/frames";
import { GetDefaultFrame } from "~~/services/frames/frameGetters";
import { Frame } from "~~/types/commontypes";

const thumbnailImageStyle = {
  marginTop: "-7px",
  marginLeft: "7px",
  maxWidth: "90%",
  height: "auto",
  maxHeight: "90%",
  borderRadius: "5px",
};
const sidebarStyle = {
  height: "605px",
  padding: "10px",
  overflow: "auto",
};

const thumbnailStyle = {
  padding: "10px",
  height: "175px",
  marginBottom: "10px",
  boxShadow: "2px 2px 2px grey",
  cursor: "pointer",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: "black",
  borderRadius: "15px",
  transition: "background-color 0.3s",
};
const thumbnailActiveStyle = {
  ...thumbnailStyle,
  backgroundColor: "#c0c0c0",
};
function FrameSidebar() {
  const { productQuery, productID, frame, setFrame, setCurrentFrame, createFrame } = useProductJourney();
  const [frames, setFrames] = useState<Frame[] | undefined>(undefined);
  const [currentFrameId, setCurrentFrameId] = useState<string>(frame?._id as string);
  useEffect(() => {
    if (productQuery.data) {
      Promise.all(productQuery.data.frames.map(frame => getFrameById(frame)))
        .then(data => setFrames(data))
        .catch(error => console.error("Error fetching frames:", error));
    }
  }, [productQuery.data]);

  useEffect(() => {
    setCurrentFrameId(frame?._id as string);
  }, [frame]);

  const onCreate = async () => {
    await createFrame.mutateAsync({
      name: "Frame",
      frameJson: await GetDefaultFrame(productID),
    });
  };
  if (!frames) return null;
  return (
    <div className="bg-white flex flex-col gap-2 p-4 h-full">
      <div style={sidebarStyle}>
        {frames.map(slide => (
          <div
            key={slide._id}
            style={slide._id === currentFrameId ? thumbnailActiveStyle : thumbnailStyle}
            onClick={() => {
              setCurrentFrameId(slide._id as string);
              setFrame(slide);
              setCurrentFrame(slide.frameJson);
            }}
          >
            {/*@ts-ignore*/}
            <img src={slide?.frameJson?.image.src} alt={slide?.name} style={thumbnailImageStyle} />
            <div style={{ alignItems: "center", justifyContent: "center", display: "flex", marginTop: "-0px" }}>
              {slide.name}
            </div>
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
