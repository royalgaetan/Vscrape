import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Successfully connected to Database: MongoDB");
  } catch (e) {
    console.log("❌ Could not connect to database... ", e);
  }
};

export default connectToDatabase;
