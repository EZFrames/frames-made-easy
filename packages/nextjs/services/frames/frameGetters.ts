import { FrameMetadataType } from "@coinbase/onchainkit";
import { DEFAULT_FRAME } from "~~/constants";

export const GetDefaultFrame = async (journey_id: string) => {
  let frame: FrameMetadataType = DEFAULT_FRAME;
  frame.state.journey_id = journey_id;
  return frame;
};
