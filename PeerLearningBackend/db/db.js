import mongoose from "mongoose";

export const connectDB = async (params) => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connection successfull host: ${connectionInstance.connection.host}`);
        
    }catch (error) {
        console.log('MongoDb connection failed');
        process.exit(0)
    }
}