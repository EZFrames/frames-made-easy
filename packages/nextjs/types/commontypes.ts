import { FrameMetadataType } from "@coinbase/onchainkit";

export interface NodeData {
  label?: string;
  frameId?: string;
}
export interface JourneyJson {
  nodes: any[];
  edges: any[];
}

export interface Journey {
  _id: string;
  name: string;
  walletAddress: string;
  journeyJson: JourneyJson;
  desc?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Frame {
  _id: string;
  name: string;
  frameJson: FrameMetadataType;
}
