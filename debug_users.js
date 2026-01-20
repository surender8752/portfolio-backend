import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

async function listUsers() {
    console.log("Starting listUsers script...");
    console.log("MONGO_URI:", process.env.MONGO_URI ? "Found" : "NOT FOUND");

    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("Connected successfully!");

        const users = await User.find({});
        console.log("Users found:", users.length);
        users.forEach(u => {
            console.log(`- Email: ${u.email}, ID: ${u._id}`);
        });

    } catch (err) {
        console.error("Connection Error:", err.message);
    } finally {
        console.log("Closing connection...");
        await mongoose.disconnect();
        console.log("Done.");
    }
}

listUsers();
