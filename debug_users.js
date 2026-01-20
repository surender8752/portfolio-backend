import fs from "fs";
import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

let logContent = "";
function log(msg) {
    console.log(msg);
    logContent += msg + "\n";
}

async function listUsers() {
    log("Starting listUsers script...");
    log("MONGO_URI: " + (process.env.MONGO_URI ? "Found" : "NOT FOUND"));

    try {
        log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        log("Connected successfully!");

        const users = await User.find({});
        log("Users found: " + users.length);
        users.forEach(u => {
            log(`- Email: ${u.email}, ID: ${u._id}`);
        });

    } catch (err) {
        log("Connection Error: " + err.message);
    } finally {
        log("Closing connection...");
        await mongoose.disconnect();
        log("Done.");
        fs.writeFileSync("debug_result.txt", logContent);
    }
}

listUsers();
