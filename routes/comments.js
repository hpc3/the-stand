const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");

const Comment = require("../models/Comment");

// Get all comments

router.get("/", verifyToken, async (req, res) => {
  try {
    const payload = await Comment.find({}, { _id: 0, __v: 0 });
    res.json(payload);
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !message) {
      throw Error("Missing a name and message are required");
    }

    const newComment = new Comment({
      name,
      email,
      message,
    });

    await newComment.save();

    res.status(201).json({ message: "Comment has been posted" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
