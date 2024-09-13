import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        console.log('MongoDB URI:', process.env.MONGO_URL);

        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connecting to ${conn.connection.host}`);  
    } catch (error) {
        console.log("Error connection on MongoDb", error.message);
        process.exit(1); //1 is the error and 0 is the succsss
    }
}