const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/User");

async function createUserHandler(req, res, next) {
  // NOTE: NEW USERS ARE NOT SIGNED IN BECAUSE ROUTE WILL NOT BE ACCESSABLE FROM FRONT END
  // CREATING NEW USER ISN'T A KEY FEATURE SEEING AS HOW ONLY 1 OR 2 USERS WILL EVER NEED TO EXIST

  //POSSIBLE OUTCOMES
  // 1. USERNAME OR PASSWORD IS MISSING -> 422
  // 2. USERNAME IS ALREADY TAKEN -> 409
  // 3. USER SUCCESSFULLY CREATED -> 401

  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });

  if (!newUser.username || !newUser.password) {
    // 1. USERNAME OR PASSWORD IS MISSING
    res.status(422).json({ message: "Missing username or password" });
    next();
    return;
  }

  await User.findOne({
    username: newUser.username,
  })
    .then((user) => {
      console.log("in then");
      if (user) {
        // 2. USERNAME IS ALREADY TAKEN
        res.status(409).json({ message: "A user with that name already exists" });
        next();
        return;
      } else {
        bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
          if (err) {
            res.json({ message: err });
            next();
            return;
          } else {
            // ASSIGN HASHED PASSWORD TO USER
            newUser.password = hash;

            // ADD newUser WITH HASHED PASSWORD TO MONGODB USERS COLLECTION
            newUser
              .save()
              .then((data) => {
                // 3. USER SUCCESSFULLY CREATED
                res.status(201);
                next();
                return;
              })
              .catch((err) => {
                res.json({ errorMessage: err });
                next();
                return;
              });
          }
        });
      }
    })
    .catch((err) => {
      res.json({ message: err });
      next();
      return;
    });
}

module.exports = createUserHandler;
