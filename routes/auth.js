const express = require("express");

const loginHandler = require("../middlewares/loginHandler");
const createUserHandler = require("../middlewares/createUserHandler");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// SIGN IN A USER

router.post("/login", loginHandler, (req, res) => {});

// VERIFY A TOKEN

router.post("/verifyToken", verifyToken, (req, res) => {
  res.send();
});

// CREATE A NEW USER

router.post("/createUser", createUserHandler, (req, res) => {});

module.exports = router;
