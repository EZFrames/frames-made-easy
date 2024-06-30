import { useProductJourney } from "~~/providers/ProductProvider";

function FrameRender() {
  const { currentFrame } = useProductJourney();
  if (!currentFrame) return null;
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        // @ts-ignore
        src={currentFrame.image?.src as string}
        alt="Description of the image"
        style={{
          borderRadius: "4px",
          border: "1px solid #ccc",
          aspectRatio: "1:1",
          maxHeight: "500px",
          width: "100%",
        }}
      />
      {currentFrame.input?.text && (
        <input
          className="w-full p-2 border mt-1 border-gray-400 rounded bg-white" // Set background color to white
          type="text"
          placeholder={currentFrame.input.text}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "4px",
          gap: "4px",
        }}
      >
        {currentFrame.buttons?.map(({ label }, index: number) => (
          <button
            type="button"
            className="btn bg-black rounded-md text-white px-4 py-2"
            style={{
              flex: "1 1 0px",
              cursor: "pointer",
            }}
            key={index}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}

export default FrameRender;
