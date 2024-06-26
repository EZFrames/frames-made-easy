import React, { useEffect, useState } from "react";
import ButtonList from "./ButtonsList";
import InputField from "./InputField";
import { FrameImageMetadata } from "@coinbase/onchainkit";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useProductJourney } from "~~/providers/ProductProvider";

const FrameEditor = () => {
  const { frame: dbFrame } = useProductJourney();
  const frame = dbFrame?.frameJson;
  const [imageUrl, setImageUrl] = useState<string>("");
  const [additionalInput, setAdditionalInput] = useState<string>("");

  const [imageUrlOption, setImageUrlOption] = useState("url");

  useEffect(() => {
    if (!frame) return;
    setImageUrl((frame.image as FrameImageMetadata).src as string);
    setAdditionalInput(frame.input?.text as string);
  }, [frame]);

  return (
    <div className="p-6 h-[100vh] bg-white rounded-md shadow-md flex flex-col gap-4">
      <label htmlFor="imageInput" className="block text-sm font-medium text-gray-700">
        Image/HTML{" "}
      </label>
      <Select
        id="imageInput"
        value={imageUrlOption}
        onChange={e => {
          setImageUrlOption(e.target.value);
          setImageUrl(""); // Clear the input box value when the dropdown selection changes
        }}
        variant="outlined"
      >
        <MenuItem value="url">URL</MenuItem>
        <MenuItem value="html">HTML</MenuItem>
      </Select>{" "}
      <InputField
        id="imageUrl"
        label={imageUrlOption === "url" ? "Enter Image URL" : "Enter HTML Code"}
        value={imageUrl}
        onChange={setImageUrl}
        placeholder={imageUrlOption === "url" ? "Image URL" : "HTML Code"}
      />
      <InputField
        id="additionalInput"
        label="Enter Additional Input"
        value={additionalInput}
        onChange={setAdditionalInput}
        placeholder="Additional Input"
      />
      <ButtonList />
    </div>
  );
};

export default FrameEditor;
