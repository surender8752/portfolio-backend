import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

async function updateAdmin() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);

        const newEmail = process.env.ADMIN_EMAIL.trim().toLowerCase();
        const newPassword = process.env.ADMIN_PASSWORD;

        // Check if any admin exists
        const user = await User.findOne({}); // Finding first user (the admin)

        if (user) {
            console.log(`Found current admin: ${user.email}`);
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            user.email = newEmail;
            user.password = hashedPassword;

            await user.save();
            console.log("-----------------------------------------");
            console.log("SUCCESS: Admin credentials updated!");
            console.log(`New Email: ${newEmail}`);
            console.log(`New Password: (updated in database)`);
            console.log("-----------------------------------------");
        } else {
            console.log("No admin user found to update. Creating a new one instead...");
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const newUser = new User({
                email: newEmail,
                password: hashedPassword
            });
            await newUser.save();
            console.log("SUCCESS: New admin created!");
        }

    } catch (err) {
        console.error("Error updating admin:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

updateAdmin();
