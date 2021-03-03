const express = require("express");
const createError = require("http-errors");

const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");

const Comment = require("../models/Comment");

// Get all comments

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const payload = await Comment.find({}, { __v: 0 });
    const filteredForArchived = payload.filter((comment) => !comment.archived);
    res.json(filteredForArchived);
  } catch (error) {
    next(error);
    return;
  }
});

// Get Archived comments

router.get("/getArchived", verifyToken, async (req, res, next) => {
  try {
    const payload = await Comment.find({}, { __v: 0 });
    const filteredForArchived = payload.filter((comment) => comment.archived);
    res.json(filteredForArchived);
  } catch (error) {
    next(error);
    return;
  }
});

// Submit a comment
router.post("/", async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const date = new Date();
    const isoString = date.toISOString();
    if (!name || !message) {
      throw createError(400, "Missing name or comment");
    }

    const newComment = new Comment({
      name,
      email,
      message,
      dateSubmitted: isoString,
    });

    await newComment.save();

    res.status(201).json({ message: "Comment has been posted" });
  } catch (error) {
    next(error);
    return;
  }
});

// Archive a comment

router.post("/archive", verifyToken, async (req, res, next) => {
  const { id } = req.body;

  try {
    const comment = await Comment.findById({ _id: id });
    if (!comment) {
      throw createError(404, "Can't find the comment");
    }
    await Comment.updateOne(
      { _id: id },
      { $set: { archived: !comment.archived } }
    );
    res.status(201).json({ message: "it work" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
