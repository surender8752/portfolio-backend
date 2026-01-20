import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_do_not_use_in_prod";

// ADMIN SIGNUP (Disabled)
/*
router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newUser = new User({
            email: email.trim().toLowerCase(),
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ message: "Server error during registration" });
    }
});
*/

// ADMIN LOGIN
router.post("/login", async (req, res) => {
    // ... existing logic ...
});

// TEMPORARY: Reset Admin Credentials via Browser
// Open this in browser: https://portfolio-backend-hazel-five.vercel.app/api/auth/reset-admin
router.get("/reset-admin", async (req, res) => {
    try {
        const email = process.env.ADMIN_EMAIL.trim().toLowerCase();
        const password = process.env.ADMIN_PASSWORD;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find and update or create
        let user = await User.findOne({});
        if (user) {
            user.email = email;
            user.password = hashedPassword;
            await user.save();
            res.json({ message: "Admin updated successfully!", email });
        } else {
            user = new User({ email, password: hashedPassword });
            await user.save();
            res.json({ message: "New admin created successfully!", email });
        }
    } catch (err) {
        res.status(500).json({ message: "Error resetting admin", error: err.message });
    }
});

export default router;
