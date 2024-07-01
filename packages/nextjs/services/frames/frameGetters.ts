import { FrameMetadataType } from "@coinbase/onchainkit";
import { APP_URL, DEFAULT_FRAME, txFrame } from "~~/constants";

export const GetDefaultFrame = async (journey_id: string) => {
  const frame: FrameMetadataType = DEFAULT_FRAME;
  if (frame.state) {
    frame.state.journey_id = journey_id;
  }
  return frame;
};

export const GetProductFrame = async (
  journey_id: string,
  frame_id: string,
  frame_id_2: string,
  frame_id_3: string,
  productImage: any,
) => {
  const PRODUCT_FRAME: FrameMetadataType = {
    buttons: [
      {
        action: "post",
        target: APP_URL + "/api/orchestrator/" + frame_id_2,
        label: "Get Details",
      },
      {
        action: "post",
        target: APP_URL + "/api/orchestrator/" + frame_id_3,
        label: "Buy Now",
      },
    ],
    image: {
      src: productImage,
    },
    state: {
      journey_id: journey_id,
      frame_id: frame_id,
    },
  };
  return PRODUCT_FRAME;
};

export const GetDescriptionFrame = async (
  journey_id: string,
  frame_id: string,
  next_frame_id: string,
  productDesc: string,
) => {
  const DESCRIPTION_FRAME: FrameMetadataType = {
    buttons: [
      {
        action: "post",
        target: APP_URL + "/api/orchestrator/" + next_frame_id,
        label: "Buy Now",
      },
    ],
    image: {
      src: "https://via.placeholder.com/150",
    },
    state: {
      journey_id: journey_id,
      frame_id: frame_id,
    },
  };
  return DESCRIPTION_FRAME;
};

export const GetEmailFrame = async (
  journey_id: string,
  frame_id: string,
  next_frame_id: string,
  productImage: string,
) => {
  const EMAIL_FRAME: FrameMetadataType = {
    buttons: [
      {
        action: "post",
        target: APP_URL + "/api/orchestrator/" + next_frame_id,
        label: "Next",
      },
    ],
    image: {
      src: productImage,
    },
    state: {
      journey_id: journey_id,
      frame_id: frame_id,
    },
    input: {
      text: "Enter your email address",
    },
  };
  return EMAIL_FRAME;
};

export const GetBuyFrame = async (journey_id: string, frame_id: string, next_frame_id: string) => {
  const newTxFrame = {
    buttons: [
      {
        action: "tx",
        label: "Buy",
        target: `${APP_URL}/api/orchestrator/tx`,
        postUrl: `${APP_URL}/api/orchestrator/` + next_frame_id,
      },
    ],
    image: {
      src: `https://amber-causal-cougar-937.mypinata.cloud/ipfs/QmafH4oZDZWFynGyK9gHVvPRFTTFFrbwYwGQNps4FDLky2`,
    },
    input: {
      text: "Enter No of items",
    },
    state: {
      journey_id: journey_id,
      frame_id: frame_id,
    },
  } as FrameMetadataType;
  return newTxFrame;
};

export const GetSuccessFrame = async (journey_id: string, frame_id: string) => {
  const SUCCESS_FRAME: FrameMetadataType = {
    image: {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW_BNf9b9fUN735sATwS1OfxlfV-LD9RhVMA&s",
    },
    state: {
      journey_id: journey_id,
      frame_id: frame_id,
    },
    buttons: [
      {
        action: "link",
        target: APP_URL,
        label: "Finish",
      },
    ],
  };
  return SUCCESS_FRAME;
};
