import InputField from "./InputField";
import { FrameButtonMetadata } from "@coinbase/onchainkit";
import { IconButton, MenuItem, Select } from "@mui/material";
import { TrashIcon } from "@heroicons/react/24/outline";

interface ButtonEditorProps {
  button: FrameButtonMetadata;
  onSave: (button: FrameButtonMetadata) => void;
  onDelete: () => void;
}

const ButtonEditor = ({ button, onSave, onDelete }: ButtonEditorProps) => {
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
        onChange={e => onSave({ ...button, action: e.target.value as string })}
        variant="outlined"
      >
        <MenuItem value="tx">Transaction</MenuItem>
        <MenuItem value="post">Post</MenuItem>
        <MenuItem value="link">Link</MenuItem>
        <MenuItem value="post_redirect">Post Redirect</MenuItem>
      </Select>
      <InputField
        id="buttonTarget"
        label="Edit Button Target"
        value={button.target || ""}
        onChange={target => onSave({ ...button, target })}
        placeholder="Button Target"
      />
      {button.action === "tx" && (
        <InputField
          id="buttonPostUrl"
          label="Edit Button Post URL"
          value={button.postUrl || ""}
          onChange={postUrl => onSave({ ...button, postUrl })}
          placeholder="Button Post URL"
        />
      )}
    </div>
  );
};

export default ButtonEditor;
