import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_do_not_use_in_prod";

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
        return res.json({ token });
    }

    return res.status(401).json({ message: "Invalid Email or Password" });
});

export default router;
