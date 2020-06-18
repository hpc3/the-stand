const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

async function loginHandler(req, res, next) {
  // POSSIBLE OUTCOMES
  // 1. THE USER DOES NOT EXIST IN THE DATABASE -> Send 404
  // 2. THE PASSWORDS DO NOT MATCH -> Send 401
  // 3. USER EXIST AND PASSWORD MATCH -> Send Token
  // 4. USERNAME OR PASSWORD IS EMPTY -> Send 422

  let { username, password } = req.body;

  if (!username || !password) {
    // 4. USERNAME OR PASSWORD IS EMPTY
    res.status(422).json({ message: "Missing username or password" });
    next();
    return;
  }

  await User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (!user) {
        // 1. THE USER DOES NOT EXIST IN THE DATABASE
        res.status(404).json({ message: "User does not exists" });
        next();
        return;
      } else {
        bcrypt.compare(
          req.body.password,
          user.password,
          (bcryptErr, request) => {
            if (bcryptErr) {
              res.json(bcryptErr);
              next();
              return;
            }
            // 3. USER EXIST AND PASSWORD MATCH -> LOG IN
            if (request) {
              const accessToken = jwt.sign(
                { user },
                process.env.JWT_SECRET_TOKEN,
                { expiresIn: "30m" }
              );

              res.status(200).json(accessToken);
              next();
              return;
            }
            // 2. THE PASSWORDS DO NOT MATCH
            else {
              res.status(401).send({ message: "Password does not match" });
              next();
              return;
            }
          }
        );
      }
    })
    .catch((err) => {
      res.json(err);
      next();
      return;
    });
}

module.exports = loginHandler;
