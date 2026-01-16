import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET || "fallback_secret_do_not_use_in_prod");
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

export default authMiddleware;
