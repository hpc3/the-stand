const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/User");

async function createUserHandler(req, res, next) {
  // NOTE: NEW USERS ARE NOT SIGNED IN BECAUSE ROUTE WILL NOT BE ACCESSABLE FROM FRONT END
  // CREATING NEW USER ISN'T A KEY FEATURE SEEING AS HOW ONLY 1 OR 2 USERS WILL EVER NEED TO EXIST

  //POSSIBLE OUTCOMES
  // 1. USERNAME OR PASSWORD IS MISSING -> 422
  // 2. USERNAME IS ALREADY TAKEN -> 409
  // 3. USER SUCCESSFULLY CREATED -> 201

  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });

    if (!newUser.username || !newUser.password) {
      // 1. USERNAME OR PASSWORD IS MISSING
      throw new Error("Username or password is missing");
    }

    const user = await User.findOne({ username: newUser.username });

    if (user) {
      // 2. USERNAME IS ALREADY TAKEN 
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);

    newUser.password = hashedPassword;

    const ret = await newUser.save();

    // USER SUCESSFULLY CREATED
    res.status(201).json({ message: "User has been created" });
    next();
    return;
  } catch (error) {
    return next(error);
  }
}

module.exports = createUserHandler;
