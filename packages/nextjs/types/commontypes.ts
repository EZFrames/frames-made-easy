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
  walletAddress: string;
  name: string;
  desc?: string;
  image?: string;
  quantity: number;
  price: string;
  frames: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Frame {
  _id: string;
  name: string;
  frameJson: FrameMetadataType;
}
