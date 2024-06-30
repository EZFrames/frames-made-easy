import { useEffect, useState } from "react";
import InputField from "./InputField";
import { FrameButtonMetadata } from "@coinbase/onchainkit";
import { IconButton, MenuItem, Select, TextField } from "@mui/material";
import { TrashIcon } from "@heroicons/react/24/outline";
import { APP_URL } from "~~/constants";
import { useProductJourney } from "~~/providers/ProductProvider";
import { getFrameById, removeUrl } from "~~/services/frames";
import { Frame } from "~~/types/commontypes";

interface ButtonEditorProps {
  button: FrameButtonMetadata;
  onSave: (button: FrameButtonMetadata) => void;
  onDelete: () => void;
}

const ButtonEditor = ({ button, onSave, onDelete }: ButtonEditorProps) => {
  const { frames: dbFrames, frame } = useProductJourney();
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
        // @ts-ignore
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
          value={removeUrl(button.target as string)}
          onChange={e =>
            onSave({
              ...button,
              target: (`${APP_URL}/api/orchestrator/` + e.target.value) as FrameButtonMetadata["target"],
            })
          }
          variant="outlined"
        >
          {frames?.map(
            (f, index) =>
              f._id !== frame?._id && (
                <MenuItem key={index} value={f._id}>
                  {f.name}
                </MenuItem>
              ),
          )}
        </Select>
      )}
      {button.action === "link" && (
        <TextField
          id="link"
          label="Enter Link"
          variant="outlined"
          value={button.target}
          onChange={e => onSave({ ...button, target: e.target.value })}
          fullWidth
        />
      )}
      {button.action === "tx" && (
        <>
          <Select
            id="post"
            value={removeUrl(button.postUrl as string)}
            onChange={e =>
              onSave({
                ...button,
                postUrl: `${APP_URL}/api/orchestrator/` + e.target.value,
                target: `${APP_URL}/api/orchestrator/tx`,
              })
            }
            variant="outlined"
          >
            {frames?.map(
              (f, index) =>
                f._id !== frame?._id && (
                  <MenuItem key={index} value={f._id}>
                    {f.name}
                  </MenuItem>
                ),
            )}
          </Select>
        </>
      )}
    </div>
  );
};

export default ButtonEditor;
