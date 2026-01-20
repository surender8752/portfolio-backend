import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

async function testLogin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
        const password = process.env.ADMIN_PASSWORD.trim();

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (isMatch) {
            console.log("Login logic works!");
        } else {
            console.log("Login failed: password mismatch");
        }

    } catch (err) {
        console.error("Test Error:", err);
    } finally {
        await mongoose.disconnect();
    }
}

testLogin();
