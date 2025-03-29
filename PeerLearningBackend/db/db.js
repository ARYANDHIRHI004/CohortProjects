import mongoose from "mongoose";

export const connectDB = async (params) => {
    try {
        const connectionInstance = await mongoose.connect()
        console.log("MongoDB connection successfull");
    

    }catch (error) {
        console.log('MongoDb connection failed');
        process.exit(0)
    }
}