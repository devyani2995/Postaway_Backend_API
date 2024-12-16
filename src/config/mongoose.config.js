import mongoose from "mongoose";

export const mongooseConnect = async () => {
  const url = "mongodb://localhost:27017/postaway";

  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
