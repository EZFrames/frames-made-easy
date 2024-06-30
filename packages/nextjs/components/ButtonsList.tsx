import { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonEditor from "./ButtonEditor";
import FarcasterModal from "./FarcasterModal";
import { FrameButtonMetadata, FrameMetadataType } from "@coinbase/onchainkit";
import { IconButton } from "@mui/material";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useProductJourney } from "~~/providers/ProductProvider";
import { notification } from "~~/utils/scaffold-eth";

const ButtonList = () => {
  const router = useRouter();
  const { currentFrame, setCurrentFrame, frame, saveFrame, deleteFrame, journey } = useProductJourney();
  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);
  const [open, setOpen] = useState(false);
  if (!currentFrame) return null;
  const handleAddButton = () => {
    // @ts-ignore
    setCurrentFrame(prevFrame => ({
      ...prevFrame,
      buttons: [
        ...(prevFrame?.buttons || []),
        {
          label: "New Button",
          postUrl: "",
          target: "",
        },
      ],
    }));
  };

  const handleButtonClick = (index: number) => {
    setActiveButtonIndex(index);
  };

  const handleSaveFrame = async () => {
    notification.info("Frame saved successfully");
    await saveFrame.mutateAsync({
      _id: frame?._id as string,
      name: frame?.name as string,
      frameJson: currentFrame as FrameMetadataType,
    });
  };

  const handleSave = (button: FrameButtonMetadata) => {
    if (currentFrame) {
      // @ts-ignore
      const newButtons = [...currentFrame.buttons];
      newButtons[activeButtonIndex] = button;
      setCurrentFrame({
        ...currentFrame,
        // @ts-ignore
        buttons: newButtons,
      });
    }
  };

  const handleDelete = () => {
    if (!currentFrame) return;
    if (currentFrame?.buttons?.length === 1) {
      notification.error("At least one button is required");
      return;
    }
    const newButtons = [...currentFrame.buttons];
    newButtons.splice(activeButtonIndex, 1);
    // @ts-ignore
    setCurrentFrame({
      ...currentFrame,
      // @ts-ignore
      buttons: newButtons,
    });
    setActiveButtonIndex(0);
  };
  return (
    <div className="mb-4 flex flex-col gap-2">
      <div className="flex items-center  gap-2">
        <label htmlFor="buttons" className="block text-sm font-medium text-gray-700 ">
          Buttons
        </label>
        {/* @ts-ignore*/}
        {currentFrame?.buttons?.length < 4 && (
          <IconButton onClick={handleAddButton}>
            <PlusIcon className="w-4 h-4 text-gray-700 border-2 border-black" />
          </IconButton>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {currentFrame?.buttons?.map((button, index) => (
          <button key={index} className="btn btn-primary" onClick={() => handleButtonClick(index)}>
            {button.label}
          </button>
        ))}
      </div>
      {/* @ts-ignore */}
      {currentFrame?.buttons[activeButtonIndex] && (
        <ButtonEditor button={currentFrame.buttons[activeButtonIndex]} onSave={handleSave} onDelete={handleDelete} />
      )}
      <div className="flex items-center">
        <button
          onClick={() => {
            deleteFrame.mutateAsync(frame?._id as string);
          }}
          className="btn btn-error mt-2 flex items-center justify-center"
        >
          Delete Frame
        </button>
        <button onClick={handleSaveFrame} className="btn btn-success  mt-2 flex items-center justify-center">
          Save Frame
        </button>
        <button onClick={() => setOpen(!open)} className="btn btn-primary mt-2 flex items-center justify-center">
          Export Product
        </button>
      </div>
      {open && <FarcasterModal isOpen={open} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default ButtonList;
