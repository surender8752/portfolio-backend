import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

async function listUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const users = await User.find({});
        console.log("Users found:", users.length);
        users.forEach(u => {
            console.log(`- Email: ${u.email}, ID: ${u._id}`);
        });

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
    }
}

listUsers();
