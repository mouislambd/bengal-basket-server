import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import dns from "dns";
import FoodItem from "./models/FoodItem.js";

dns.setServers(['8.8.8.8', '8.8.4.4']);

const cleanup = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MongoDB connected");

        const result = await FoodItem.deleteMany({});
        console.log(`${result.deletedCount} items deleted!`);

        process.exit(0);
    } catch (error) {
        const err = error as Error;
        console.error("Error:", err.message);
        process.exit(1);
    }
};

cleanup();