import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB(): Promise<void> {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(env.MONGODB_URL);
    console.log(`[db] Connected to MongoDB at ${env.MONGODB_URL}`);
  } catch (err) {
    console.error("[db] MongoDB connection error:", err);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("[db] MongoDB disconnected");
  });
}
