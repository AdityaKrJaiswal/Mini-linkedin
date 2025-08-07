import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    const posts = await Post.find({ user: req.params.id }).sort({ createdAt: -1 });
    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
