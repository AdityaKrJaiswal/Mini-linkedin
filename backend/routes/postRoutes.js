import express from "express";
import protect from "../middleware/authMiddleware.js";
import Post from "../models/Post.js";

const router = express.Router();

// CREATE POST
// CREATE POST
router.post("/", protect, async (req, res) => {
  try {
    const { content } = req.body;
    const newPost = await Post.create({ content, user: req.user._id });

    const populatedPost = await Post.findById(newPost._id).populate("user");
    res.status(201).json({ post: populatedPost });
  } catch (err) {
    console.error(err); // optional: for debugging
    res.status(500).json({ message: err.message });
  }
});


// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET POSTS BY USER
router.get("/user/:id", async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
