import React, { useEffect, useState } from "react";
import { FrameButtonMetadata, FrameImageMetadata, FrameMetadataType } from "@coinbase/onchainkit";

type FrameEditorProps = {
  frame: FrameMetadataType;
};

const FrameEditor = ({ frame }: FrameEditorProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [additionalInput, setAdditionalInput] = useState<string>("");
  const [buttons, setButtons] = useState<FrameButtonMetadata[]>([{ label: "Button 1" }]);
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(null);
  const [imageUrlOption, setImageUrlOption] = useState("url");

  const handleAddButton = () => {
    setButtons([...buttons, { label: `Button ${buttons.length + 1}` }]);
  };

  const handleButtonClick = (index: number) => {
    setActiveButtonIndex(index);
  };

  const handleSaveButton = (button: FrameButtonMetadata) => {
    if (activeButtonIndex !== null && activeButtonIndex >= 0 && activeButtonIndex < buttons.length) {
      // Use a default label if the button label is empty
      if (button.label.trim() === "") {
        button.label = `Button ${activeButtonIndex + 1}`;
      }

      // Create a new array with the updated button
      const updatedButtons = [...buttons];
      updatedButtons[activeButtonIndex] = button;

      setButtons(updatedButtons);
      setActiveButtonIndex(null);
    }
  };

  useEffect(() => {
    if (!frame) return;
    setButtons(frame.buttons || [{ label: "Button 1" }]);
    setImageUrl((frame.image as FrameImageMetadata).src as string);
    setAdditionalInput(frame.input?.text as string);
  }, [frame]);

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="imageInput" className="block text-sm font-medium text-gray-700 mb-1">
          Select Input Type
        </label>
        <select
          id="imageInput"
          value={imageUrlOption}
          onChange={e => {
            setImageUrlOption(e.target.value);
            setImageUrl(""); // Clear the input box value when the dropdown selection changes
          }}
          className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 text-black"
        >
          <option value="url">Image</option>
          <option value="html">HTML</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
          {imageUrlOption === "url" ? "Enter Image URL" : "Enter HTML Code"}
        </label>
        <input
          id="imageUrl"
          type="text"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          placeholder={imageUrlOption === "url" ? "Image URL" : "HTML Code"}
          className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 text-black"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="buttons" className="block text-sm font-medium text-gray-700 mb-1">
          Add Required Number of Buttons
        </label>
        <div className="flex flex-wrap gap-2">
          {buttons.map((button, index) => (
            <button key={index} className="btn btn-primary" onClick={() => handleButtonClick(index)}>
              {button.label}
            </button>
          ))}
        </div>

        {buttons.length < 4 && (
          <button onClick={handleAddButton} className="btn btn-primary w-full mt-2 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Button
          </button>
        )}
      </div>

      {/* Additional Input Section */}
      <div className="mb-4">
        <label htmlFor="additionalInput" className="block text-sm font-medium text-gray-700 mb-1">
          Enter Additional Input
        </label>
        <input
          id="additionalInput"
          type="text"
          value={additionalInput}
          onChange={e => setAdditionalInput(e.target.value)}
          placeholder="Additional Input"
          className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 text-black"
        />
      </div>

      {/* Save Frame Button */}

      {activeButtonIndex !== null && activeButtonIndex >= 0 && activeButtonIndex < buttons.length && (
        <>
          <label htmlFor="buttonLabel" className="block text-sm font-medium text-gray-700 mb-1">
            Edit Button Label
          </label>
          <input
            id="buttonLabel"
            type="text"
            value={buttons[activeButtonIndex].label}
            onChange={e => handleSaveButton({ ...buttons[activeButtonIndex], label: e.target.value })}
            placeholder="Button Label"
            className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 text-black"
          />
          <label htmlFor="buttonAction" className="block text-sm font-medium text-gray-700 mb-1">
            Edit Button Action
          </label>
          <select
            id="buttonAction"
            value={buttons[activeButtonIndex].action}
            onChange={e => handleSaveButton({ ...buttons[activeButtonIndex], action: e.target.value as any })}
            className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 text-black"
          >
            <option value="link">Link</option>
            <option value="post_redirect">Post Redirect</option>
            <option value="tx">Transaction</option>
          </select>
          <label htmlFor="buttonTarget" className="block text-sm font-medium text-gray-700 mb-1">
            <input
              id="buttonTarget"
              type="text"
              value={buttons[activeButtonIndex].target}
              onChange={e => handleSaveButton({ ...buttons[activeButtonIndex], target: e.target.value })}
              placeholder="Button Target"
              className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 text-black"
            />
          </label>
          {buttons[activeButtonIndex].action === "tx" && (
            <>
              <label htmlFor="buttonPostUrl" className="block text-sm font-medium text-gray-700 mb-1">
                <input
                  id="buttonPostUrl"
                  type="text"
                  // @ts-ignore
                  value={buttons[activeButtonIndex].postUrl}
                  // @ts-ignore
                  onChange={e => handleSaveButton({ ...buttons[activeButtonIndex], postUrl: e.target.value as any })}
                  placeholder="Button Post URL"
                  className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 text-black"
                />
              </label>
            </>
          )}
        </>
      )}
      <button
        onClick={() => {
          console.log("HJERER");
        }}
        className="w-full px-4 py-2 bg-blue-500 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
      >
        Save Frame
      </button>
    </div>
  );
};

export default FrameEditor;
