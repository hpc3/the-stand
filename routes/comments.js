const express = require("express");
const createError = require("http-errors");

const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");

const Comment = require("../models/Comment");

// Get all comments

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const payload = await Comment.find({}, { _id: 0, __v: 0 });
    res.json(payload);
  } catch (error) {
    next(error);
    return;
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !message) {
      throw createError(400, "Missing name or comment")
    }

    const newComment = new Comment({
      name,
      email,
      message,
    });

    await newComment.save();

    res.status(201).json({ message: "Comment has been posted" });
  } catch (error) {
    next(error);
    return;
  }
});

module.exports = router;
