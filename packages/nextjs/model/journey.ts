import { Journey as JourneyType } from "../types/commontypes";
import mongoose, { Document, Schema } from "mongoose";

// Define the JourneyDocument interface extending Document
interface JourneyDocument extends Document {
  walletAddress: string;
  name: string;
  journeyJson: JourneyType;
  desc?: string;
  image?: string;
  startingFrameURL?: string;
}

// Define the Journey schema
const JourneySchema: Schema<JourneyDocument> = new Schema<JourneyDocument>(
  {
    walletAddress: String,
    name: String,
    journeyJson: Object as any as JourneyType, // Type assertion to any
    desc: String,
    image: String,
  },
  {
    timestamps: true,
  },
);

// Define and export the Journey model
const Journey = mongoose.models.Journey || mongoose.model<JourneyDocument>("Journey", JourneySchema);

export default Journey;
