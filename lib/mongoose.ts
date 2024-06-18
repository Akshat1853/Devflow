import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("missing url ");

  if (isConnected) {
    console.log("mongodb is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "DevFlow",
    });

    isConnected = true;

    console.log("mongodb connnected");
  } catch (error) {
    console.log("mongodb connection failed", error);
  }
};
