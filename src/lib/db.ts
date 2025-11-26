import mongoose, { Connection } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;
if (!MONGODB_URL) {
  throw new Error("❌ Please define the MONGODB_URL environment variable");
}



// Define a global cache type
type MongooseCache = {
  conn: Connection | null;
  promise: Promise<Connection> | null;
};

// Attach cache to globalThis to persist across hot reloads
let cached: MongooseCache = (globalThis as any).mongoose;

if (!cached) {
  cached = (globalThis as any).mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDB= async function (): Promise<Connection> {
  // Return cached connection if available
  if (cached.conn) return cached.conn;

  // If no promise exists, create one
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL).then((conn) => conn.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // reset promise if connection fails
    throw error;
  }

  return cached.conn;
}

export default connectDB;
