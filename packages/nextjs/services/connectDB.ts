import mongoose, { Mongoose } from "mongoose";

// Define the type for the cached object
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the NodeJS global object with our custom mongoose property
declare global {
  let mongoose: MongooseCache | undefined;
}

const DATABASE_URL: string = process.env.DATABASE_URL || "";

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

// @ts-ignore: We're extending the NodeJS global object
global.mongoose = global.mongoose || { conn: null, promise: null };
// @ts-ignore: We're extending the NodeJS global object
const cached = global.mongoose;

async function connectDB(): Promise<Mongoose> {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then(mongoose => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
