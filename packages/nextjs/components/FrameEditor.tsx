import React, { useEffect, useState } from "react";
import ButtonList from "./ButtonsList";
import FarcasterModal from "./FarcasterModal";
import InputField from "./InputField";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useProductJourney } from "~~/providers/ProductProvider";

const FrameEditor = () => {
  const { frame, setFrame, currentFrame, setCurrentFrame } = useProductJourney();
  const [imageUrlOption, setImageUrlOption] = useState("url");
  const [htmlInput, setHtmlInput] = useState("");
  const [imageUrl, setImageUrl] = useState(currentFrame?.image?.src || "");
  const [open, setOpen] = useState(false);
  const getImageResponse = async (html: string) => {
    const response = await fetch(`/api/imageGeneration`, {
      body: JSON.stringify({ html }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const data = await response.json();
    return data.url;
  };

  const handleImageUrlChange = (value: string) => {
    setImageUrl(value);
    if (!currentFrame) return;
    setCurrentFrame({
      ...currentFrame,
      image: {
        // @ts-ignore
        ...currentFrame?.image,
        src: value,
        aspectRatio: "1:1",
      },
    });
  };

  const handleHtmlToImage = async () => {
    const result = await getImageResponse(htmlInput);
    setImageUrl(result);
    if (!currentFrame) return;
    setCurrentFrame({
      ...currentFrame,
      image: {
        // @ts-ignore
        ...currentFrame.image,
        src: result,
        aspectRatio: "1:1",
      },
    });
  };
  useEffect(() => {
    // @ts-ignore
    setImageUrl(currentFrame?.image?.src || "");
  }, [currentFrame]);
  if (!currentFrame) return null;
  return (
    <div className="bg-white flex flex-col gap-4 p-4">
      <TextField
        id="outlined-basic"
        label="Frame Name"
        variant="outlined"
        value={frame?.name}
        fullWidth
        onChange={e => {
          if (!frame) return;
          setFrame({
            ...frame,
            name: e.target.value,
          });
        }}
      />
      <label htmlFor="imageInput" className="block text-sm font-medium text-gray-700">
        Image/Text{" "}
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
        <MenuItem value="html">TEXT</MenuItem>
      </Select>{" "}
      {imageUrlOption === "url" ? (
        <InputField
          id="imageUrl"
          label="Enter Image URL"
          value={imageUrl}
          onChange={value => handleImageUrlChange(value)}
          placeholder="Image URL"
        />
      ) : (
        <div className="flex flex-col gap-2">
          <InputField
            id="htmlInput"
            label="Enter Text"
            value={htmlInput}
            onChange={value => setHtmlInput(value)}
            placeholder="HTML Code"
          />
          <button onClick={handleHtmlToImage} className="btn btn-primary">
            Convert Text to Image
          </button>
        </div>
      )}
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
