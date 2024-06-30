import { useEffect, useState } from "react";
import InputField from "./InputField";
import { FrameButtonMetadata } from "@coinbase/onchainkit";
import { IconButton, MenuItem, Select } from "@mui/material";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useProductJourney } from "~~/providers/ProductProvider";
import { getFrameById } from "~~/services/frames";
import { Frame } from "~~/types/commontypes";
import { APP_URL } from "~~/constants";

interface ButtonEditorProps {
  button: FrameButtonMetadata;
  onSave: (button: FrameButtonMetadata) => void;
  onDelete: () => void;
}

const ButtonEditor = ({ button, onSave, onDelete }: ButtonEditorProps) => {
  const { frames: dbFrames } = useProductJourney();
  const [frames, setFrames] = useState<Frame[] | undefined>();

  useEffect(() => {
    if (dbFrames) {
      Promise.all(dbFrames.map(frame => getFrameById(frame)))
        .then(data => setFrames(data))
        .catch(error => console.error("Error fetching frames:", error));
    }
  }, [dbFrames]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 mt-4">
        <InputField
          id="buttonLabel"
          label="Edit Button Label"
          value={button.label}
          onChange={label => onSave({ ...button, label })}
          placeholder="Button Label"
        />
        <IconButton onClick={onDelete}>
          <TrashIcon className="w-4 h-4 text-gray-700 border-2 border-black" />
        </IconButton>
      </div>
      <label htmlFor="buttonAction" className="block text-sm font-medium text-gray-700 mb-1">
        Edit Button Action
      </label>
      <Select
        id="buttonAction"
        value={button.action}
        onChange={e => onSave({ ...button, action: e.target.value as FrameButtonMetadata["action"] })}
        variant="outlined"
      >
        <MenuItem value="tx">Transaction</MenuItem>
        <MenuItem value="post">Post</MenuItem>
        <MenuItem value="link">Link</MenuItem>
        <MenuItem value="post_redirect">Post Redirect</MenuItem>
      </Select>
      {button.action === "post" && (
        <Select
          id="post"
          value={button.target}
          onChange={e => onSave({ ...button, target: `${APP_URL}`+e.target.value as FrameButtonMetadata["target"] })}
          variant="outlined"
        >
          {frames?.map((frame, index) => (
            <MenuItem key={index} value={frame._id}>
              {frame.name}
            </MenuItem>
          ))}
        </Select>
      )}
    </div>
  );
};

export default ButtonEditor;
