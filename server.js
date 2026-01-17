import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true
}));
app.options('*', cors()); // Enable pre-flight for all routes
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);
app.get("/", (req, res) => {
  res.json({ status: "API is running", version: "1.0.1", endpoints: ["/api/projects", "/api/contacts", "/api/auth/login"] });
});

console.log("Mounting Auth Routes...");
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
  });

export default app;
