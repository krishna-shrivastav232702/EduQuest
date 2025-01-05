import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config();

const mongoUrl = process.env.MONGO_URL;

export const connectDb = async()=>{
    try {
        const connection = await mongoose.connect(mongoUrl);
        console.log("Connection successfull ",connection.connection.host);
    } catch (error) {
        console.log("Error connecting to database");
        process.exit(1);
    }
}