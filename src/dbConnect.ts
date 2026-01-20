import mongoose from "mongoose";
import process from "process";
// Replace with your actual MongoDB connection string
const mongoDBUri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    // Mongoose automatically handles connection pooling and other options
    await mongoose.connect(mongoDBUri);
    console.log("MongoDB Connected successfully");
  } catch (err: any) {
    console.error(`MongoDB connection error: ${err.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
