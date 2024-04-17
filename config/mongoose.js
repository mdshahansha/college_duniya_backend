import mongoose from 'mongoose'; 


import dotenv from "dotenv";
// load all the environment variables in application
dotenv.config();
export const connectUsingMongoose = async () => {
    try {
        // await mongoose.connect(url, {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected using mongoose....");
        
    } catch (err) {
        console.log(err);
    }
}