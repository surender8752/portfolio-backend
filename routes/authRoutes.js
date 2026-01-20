import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_do_not_use_in_prod";

// ADMIN SIGNUP
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

// ADMIN LOGIN
router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;

        email = email ? email.trim().toLowerCase() : "";
        password = password ? password.trim() : "";

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id, role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
        res.json({ token });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error during login" });
    }
});

export default router;
