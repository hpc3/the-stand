const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();

// Import Routes

const authRoutes = require("./routes/auth");
const produceRoutes = require("./routes/produce");
const commentRoutes = require("./routes/comments");
const salesRoutes = require("./routes/sales");

app.use(express.json());

app.use("/comment", commentRoutes);
app.use("/produce", produceRoutes);
app.use("/auth", authRoutes);
app.use("/sales", salesRoutes);

// ERROR HANDLER

app.use((error, req, res, next) => {
  res.status(error.status);
  res.json({
    message: error.message,
  });
});

// CONNECT TO DATABASE

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

// LISTEN
app.listen(port, () => {
  console.log(`SERVER IS UP ON PORT ${port}`);
});
