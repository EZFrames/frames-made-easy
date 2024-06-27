import mongoose, { Document, Schema } from "mongoose";

// Define the JourneyDocument interface extending Document
interface JourneyDocument extends Document {
  walletAddress: string;
  name: string;
  desc?: string;
  image?: string;
  prodId: string;
  quantity: number;
  price: string;
  frames: string[];
}

// Define the Journey schema
const JourneySchema: Schema<JourneyDocument> = new Schema<JourneyDocument>(
  {
    walletAddress: String,
    name: String,
    desc: String,
    image: String,
    prodId: String,
    quantity: Number,
    price: String,
    frames: [String],
  },
  {
    timestamps: true,
  },
);

// Define and export the Journey model
const Journey = mongoose.models.Journey || mongoose.model<JourneyDocument>("Journey", JourneySchema);

export default Journey;
