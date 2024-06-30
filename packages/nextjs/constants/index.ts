import { FrameMetadataType } from "@coinbase/onchainkit";

export const APP_URL = "https://950a-103-216-213-71.ngrok-free.app";
export const txFrame = {
  buttons: [
    {
      action: "tx",
      label: "purchase",
      postUrl: `${APP_URL}/frame/tx`,
      target: "",
    },
  ],
  image: {
    src: `https://w7.pngwing.com/pngs/666/150/png-transparent-messi-world-cup-2023-thumbnail.png`,
  },
} as FrameMetadataType;
export const emailFrame = {
  buttons: [
    {
      action: "post",
      label: "Dog pictures",
      target: ``,
    },
  ],
  image: {
    src: `https://w7.pngwing.com/pngs/666/150/png-transparent-messi-world-cup-2023-thumbnail.png`,
  },
  input: {
    text: "Type here",
  },
} as FrameMetadataType;

export const DEFAULT_FRAME: FrameMetadataType = {
  buttons: [
    {
      action: "post",
      target: "http://localhost:3000/api/orchestrator/1",
      label: "Home 1",
    },
    {
      action: "link",
      label: "OnchainKit",
      target: "https://onchainkit.xyz",
    },
    {
      action: "post_redirect",
      label: "Dog pictures",
    },
  ],
  image: {
    src: "https://w7.pngwing.com/pngs/666/150/png-transparent-messi-world-cup-2023-thumbnail.png",
  },
  state: {
    time: "2024-06-28T16:14:14.986Z",
    journey_id: "1",
    frame_id: "2",
  },
  input: {
    text: "Type here",
  },
};
