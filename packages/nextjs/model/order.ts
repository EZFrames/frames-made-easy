import mongoose, { Document, Schema } from "mongoose";

interface Order extends Document {
  journeyId: string;
  walletAddress: string;
  fid: string;
  quantity: number;
  price: number;
  txnId: string;
}

const OrderSchema: Schema<Order> = new Schema<Order>(
  {
    journeyId: String,
    walletAddress: String,
    fid: String,
    quantity: Number,
    price: Number,
    txnId: String,
  },
  {
    timestamps: true,
  },
);

// Define and export the Order model
const Order = mongoose.models?.Order || mongoose.model<Order>("Order", OrderSchema);

export default Order;
