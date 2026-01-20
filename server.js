import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "API is running",
    version: "1.0.4",
    endpoints: ["/api/projects", "/api/contacts"]
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () =>
      console.log("Server running on port 5000")
    );
  })
  .catch((err) => {
    try {
      fs.writeFileSync('error.txt', `Error: ${err.message}\nStack: ${err.stack}`);
    } catch (e) {
      console.error("Failed to write to error.txt", e);
    }
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

export default app;
