import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("❌ MONGODB_URI is not defined in .env file");
    }

    console.log("Connecting to MongoDB with URI:", uri);

    const conn = await mongoose.connect(uri);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
