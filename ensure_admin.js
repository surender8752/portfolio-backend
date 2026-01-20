import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

async function createAdmin() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected.");

        const email = "surenderthakur40437@gmail.com";
        const password = "admin123";

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Admin already exists. Updating password...");
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUser.password = hashedPassword;
            await existingUser.save();
            console.log("Password updated.");
        } else {
            console.log("Admin not found. Creating...");
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                email,
                password: hashedPassword
            });
            await newUser.save();
            console.log("Admin created.");
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

createAdmin();
