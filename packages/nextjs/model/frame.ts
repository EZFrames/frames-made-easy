import { FrameMetadataType } from "@coinbase/onchainkit";
import mongoose, { Document, Schema } from "mongoose";

interface FrameDocument extends Document {
  name: string;
  frameJson: FrameMetadataType;
}

const FrameSchema: Schema<FrameDocument> = new Schema<FrameDocument>(
  {
    name: String,
    frameJson: Object as any as FrameMetadataType,
  },
  {
    timestamps: true,
  },
);

// Define and export the Frame model
const Frame = mongoose.models.Frame || mongoose.model<FrameDocument>("Frame", FrameSchema);

export default Frame;
