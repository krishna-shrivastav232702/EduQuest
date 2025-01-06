import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config();

const mongoUrl:string | undefined = process.env.MONGO_URL;

if(!mongoUrl){
    console.error("Provide mongo url");
    process.exit(1);
}

export const connectDb = async():Promise<void>=>{
    try {
        const connection = await mongoose.connect(mongoUrl);
        console.log("Connection successfull ",connection.connection.host);
    } catch (error:unknown) {
        if(error instanceof Error)
        console.error(`Error connecting to MongoDB: ${error.message}`);
        else console.error("unknown error occured:",error);
        process.exit(1);
    }
}