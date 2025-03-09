import mongoose from "mongoose";

//Export a function that connect to db

export default function connect() {
  try {
    mongoose.connect(process.env.MONGODB)
      .then(() => {
        console.log(`Connected to MongoDB ${mongoose.connection.host}`);
      })
      .catch((err) => {
        console.log("Error Connecting DB");
      });
  } catch (error) {
      throw new Error("MONGODB connection failed...")
  }
}


