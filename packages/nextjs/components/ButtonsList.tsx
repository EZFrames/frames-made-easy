import { useEffect, useState } from "react";
import ButtonEditor from "./ButtonEditor";
import { FrameButtonMetadata, FrameMetadataType } from "@coinbase/onchainkit";
import { IconButton } from "@mui/material";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useProductJourney } from "~~/providers/ProductProvider";
import { saveFrame } from "~~/services/frames";
import { notification } from "~~/utils/scaffold-eth";

const ButtonList = () => {
  const { currentFrame, setCurrentFrame, frame } = useProductJourney();

  const [activeButtonIndex, setActiveButtonIndex] = useState<number>(0);
  useEffect(() => {
    console.log("currentFrame", currentFrame);
    console.log(activeButtonIndex);
    console.log(currentFrame?.buttons[activeButtonIndex]);
  }, [currentFrame, activeButtonIndex]);

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
    const updatedFrame = await saveFrame({
      _id: frame?._id as string,
      name: frame?.name as string,
      frameJson: currentFrame as FrameMetadataType,
    });
    console.log(updatedFrame);
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
      <button onClick={handleSaveFrame} className="btn btn-secondary w-full mt-2 flex items-center justify-center">
        Save Frame
      </button>
    </div>
  );
};

export default ButtonList;
