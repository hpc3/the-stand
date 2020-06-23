const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

async function loginHandler(req, res, next) {
  // POSSIBLE OUTCOMES
  // 1. THE USER DOES NOT EXIST IN THE DATABASE -> Send 404
  // 2. THE PASSWORDS DO NOT MATCH -> Send 401
  // 3. USER EXIST AND PASSWORD MATCH -> Send Token
  // 4. USERNAME OR PASSWORD IS EMPTY -> Send 422

  try {
    let { username, password } = req.body;

    if (!username || !password) {
      // USERNAME OR PASSWORD IS EMPTY -> 422 Unprocessable Entity
      throw Error;
    }

    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      // USER DOESNT EXIST IN DB -> 404 Resource Not Found
      throw Error;
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      // INCORRECT PASSWORD -> 401 Unauthorized
      throw Error;
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET_TOKEN, {
      expiresIn: "30m",
    });

    res.status(200).json(token);
    next();
    return;
  } catch (error) {
    return next(error);
  }
}

module.exports = loginHandler;
