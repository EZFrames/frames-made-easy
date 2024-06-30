import mongoose, { Document, Schema } from "mongoose";

interface Analytics extends Document {
  journeyId: string;
  frameId: string;
  fid: string;
  buttonClicked: number;
  inputtedText: string;
  timestamp: Date;
}

const AnalyticsSchema: Schema<Analytics> = new Schema<Analytics>(
  {
    journeyId: String, // journeyId to correlate
    frameId: String, //frameId to correlate
    fid: String, // fid of the user
    buttonClicked: Number, // 0 for no button clicked, 1 for button 1 clicked....
    inputtedText: String, // text inputted by the user, null if empty
    timestamp: Number, // timestamp of the event
  },
  {
    timestamps: true,
  },
);

// Define and export the Analytics model
const Analytics = mongoose.models.Analytics || mongoose.model<Analytics>("Analytics", AnalyticsSchema);

export default Analytics;
