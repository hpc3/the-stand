const express = require("express");
const mongoose = require("mongoose");

require("dotenv/config");

const port = 5000;

const app = express();

// Import Routes

const authRoutes = require("./routes/auth");
const produceRoutes = require("./routes/produce");
const commentRoutes = require("./routes/comments");

app.use(express.json());

app.use("/comment", commentRoutes);
app.use("/produce", produceRoutes);
app.use("/auth", authRoutes);

// ERROR HANDLER

app.use((error, req, res, next) => {
  res.status(error.status);
  res.json({
    message: error.message,
  });
});

// CONNECT TO DATABASE

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

// LISTEN
app.listen(port, () => {
  console.log(`SERVER IS UP ON PORT ${port}`);
});
