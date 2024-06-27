import { useProductJourney } from "~~/providers/ProductProvider";

function FrameRender() {
  const { frame: dbFrame } = useProductJourney();
  const frame = dbFrame?.frameJson;
  if (!frame) return null;
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        // @ts-ignore
        src={frame.image?.src as string}
        alt="Description of the image"
        style={{
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "100%", // Set the width to 100%
          height: "40vh", // Maintain aspect ratio
        }}
      />
      {frame.input?.text && (
        <input
          className="w-full p-2 border mt-1 border-gray-400 rounded bg-white" // Set background color to white
          type="text"
          placeholder={frame.input.text}
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
        {frame.buttons?.map(({ label, action }, index: number) => (
          <button
            type="button"
            className={`bg-gray-200 p-1 hover:bg-gray-300 `}
            style={{
              flex: "1 1 0px",
              cursor: "pointer",
            }}
            key={index}
          >
            {action === "mint" ? `♦ ` : ""}
            {label}
            {action === "post_redirect" || action === "link" ? ` ↗` : ""}
          </button>
        ))}
      </div>
    </>
  );
}

export default FrameRender;
