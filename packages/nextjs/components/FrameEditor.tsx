import React, { useState } from "react";
import ButtonList from "./ButtonsList";
import InputField from "./InputField";
import { MenuItem, Select } from "@mui/material";
import { useProductJourney } from "~~/providers/ProductProvider";

const FrameEditor = () => {
  const { currentFrame, setCurrentFrame } = useProductJourney();
  const [imageUrlOption, setImageUrlOption] = useState("url");
  if (!currentFrame) return null;
  return (
    <div className="bg-white flex flex-col gap-4 p-4">
      <label htmlFor="imageInput" className="block text-sm font-medium text-gray-700">
        Image/HTML{" "}
      </label>
      <Select
        id="imageInput"
        value={imageUrlOption}
        onChange={e => {
          setImageUrlOption(e.target.value);
        }}
        variant="outlined"
      >
        <MenuItem value="url">URL</MenuItem>
        <MenuItem value="html">HTML</MenuItem>
      </Select>{" "}
      <InputField
        id="imageUrl"
        label={imageUrlOption === "url" ? "Enter Image URL" : "Enter HTML Code"}
        // @ts-ignore
        value={currentFrame?.image?.src || ""}
        onChange={value => {
          setCurrentFrame({
            ...currentFrame,
            image: {
              // @ts-ignore
              ...currentFrame?.image,
              src: value,
            },
          });
        }}
        placeholder={imageUrlOption === "url" ? "Image URL" : "HTML Code"}
      />
      <InputField
        id="additionalInput"
        label="Enter Additional Input"
        value={currentFrame?.input?.text || ""}
        onChange={value => {
          setCurrentFrame({
            ...currentFrame,
            input: {
              ...currentFrame?.input,
              text: value,
            },
          });
        }}
        placeholder="Additional Input"
      />
      <ButtonList />
    </div>
  );
};

export default FrameEditor;
