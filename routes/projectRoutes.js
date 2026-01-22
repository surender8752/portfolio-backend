import express from "express";
import Project from "../models/Project.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all projects
router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

// POST new project
router.post("/", authMiddleware, async (req, res) => {
  const { title, tech, description, link } = req.body;
  const project = new Project({ title, tech, description, link });
  const saved = await project.save();
  res.json(saved);
});

// DELETE project
router.delete("/:id", authMiddleware, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
});




export default router;
