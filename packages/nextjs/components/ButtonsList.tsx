import { useEffect, useState } from "react";
import ButtonEditor from "./ButtonEditor";
import { FrameButtonMetadata, FrameMetadataType } from "@coinbase/onchainkit";
import { IconButton } from "@mui/material";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useProductJourney } from "~~/providers/ProductProvider";
import { notification } from "~~/utils/scaffold-eth";

const ButtonList = () => {
  const { frame: dbFrame } = useProductJourney();
  const frame = dbFrame?.frameJson as FrameMetadataType;
  const [buttons, setButtons] = useState<FrameButtonMetadata[]>([{ label: "Button 1" }]);
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(0);
  useEffect(() => {
    setButtons(frame.buttons || [{ label: "Button 1" }]);
  }, [frame]);

  const handleAddButton = () => {
    setButtons([...buttons, { label: `Button ${buttons.length + 1}` }]);
  };

  const handleButtonClick = (index: number) => {
    setActiveButtonIndex(index);
  };

  const handleSaveFrame = () => {
    notification.info("Frame saved successfully");
  };
  return (
    <div className="mb-4 flex flex-col gap-2">
      <div className="flex items-center  gap-2">
        <label htmlFor="buttons" className="block text-sm font-medium text-gray-700 ">
          Buttons
        </label>
        {buttons.length < 4 && (
          <IconButton onClick={handleAddButton}>
            <PlusIcon className="w-4 h-4 text-gray-700 border-2 border-black" />
          </IconButton>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {buttons.map((button, index) => (
          <button key={index} className="btn btn-primary" onClick={() => handleButtonClick(index)}>
            {button.label}
          </button>
        ))}
      </div>
      {activeButtonIndex !== null && (
        <ButtonEditor
          button={buttons[activeButtonIndex]}
          onSave={button => {
            const newButtons = [...buttons];
            newButtons[activeButtonIndex] = button;
            setButtons(newButtons);
          }}
          onDelete={() => {
            const newButtons = [...buttons];
            if (newButtons.length === 1) {
              notification.error("At least one button is required");
              return;
            }
            newButtons.splice(activeButtonIndex, 1);
            setButtons(newButtons);
            setActiveButtonIndex(null);
          }}
        />
      )}
      <button onClick={handleSaveFrame} className="btn btn-secondary w-full mt-2 flex items-center justify-center">
        Save Frame
      </button>
    </div>
  );
};

export default ButtonList;
