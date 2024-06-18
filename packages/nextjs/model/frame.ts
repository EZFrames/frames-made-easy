import mongoose, { Document, Schema } from "mongoose";

// Define the FrameJson interface

// Define the FrameDocument interface extending Document
interface FrameDocument extends Document {
  name: string;
  frameJson: FrameMetadataType;
}

// Define the Frame schema
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
