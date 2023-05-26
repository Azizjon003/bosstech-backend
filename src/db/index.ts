import mongoose from "mongoose";

export const connect = async (link: string, password: string) => {
  try {
    const dbUrl = link.replace("<password>", password);
    await mongoose.connect(dbUrl);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection Failed");
  }
};
