import mongoose from "mongoose";

export const connectionDB  = async()=>{
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log(process.env.MONGODB_URI);
    console.log("Connected to DataBase.")
  } catch (error) {
    console.log(error)
  }
}