require("dotenv/config");

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/User");

const router = express.Router();

// SIGN IN A USER

router.post("/login", async (req, res) => {

  // POSSIBLE OUTCOMES
  // 1. THE USER DOES NOT EXIST IN THE DATABASE -> Send 404
  // 2. THE PASSWORDS DO NOT MATCH -> Send 401
  // 3. USER EXIST AND PASSWORD MATCH -> Send Token
  // 4. USERNAME OR PASSWORD IS EMPTY -> Send 422
  

  let { username, password } = req.body;
  
  if (!username || !password) {
    // 4. USERNAME OR PASSWORD IS EMPTY
    return res.sendStatus(422);
  }

  await User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (!user) {
        // 1. THE USER DOES NOT EXIST IN THE DATABASE
         return res.sendStatus(404);
      } else {
        bcrypt.compare(
          req.body.password,
          user.password,
          (bcryptErr, request) => {
            if (bcryptErr) {
              return res.json(bcryptErr);
            }
            // 3. USER EXIST AND PASSWORD MATCH -> LOG IN
            if (request) {
              const accessToken = jwt.sign(
                { user },
                process.env.JWT_SECRET_TOKEN,
                { expiresIn: "30m" }
              );

              return res.status(201).json(accessToken);
            }
            // 2. THE PASSWORDS DO NOT MATCH
            else {
              return res.status(401).send("Password does not match");
            }
          }
        );
      }
    })
    .catch((err) => res.json(err));
});


// CREATE A NEW USER

router.post("/createUser", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });

    if(!newUser.username || !newUser.password){
        // MISSING USERNAME OR PASSWORD 
        return res.status(422).json({message: "Missing username or password"});
    }

    await User.findOne({
            username: newUser.username,
          }).then((user) => {
            if (user) {
              return res.status(409).json({ message: "A user with that name already exists" });
            } else {
              bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
                if (err) {
                  return res.json({ message: err });
                } else {
                  // ASSIGN HASHED PASSWORD TO USER
                  newUser.password = hash;
        
                  // ADD newUser WITH HASHED PASSWORD TO MONGODB USERS COLLECTION
                  newUser
                    .save()
                    .then((data) => {
                      // NOT RETURNING A KEY UPON CREATION BECAUSE ROUTE NOT ACCESSABLE FROM FRONT END 
                      return res.sendStatus(201);
                    })
                    .catch((err) => {
                      return res.json({ errorMessage: err });
                    });
                }
              });
            }
          })
          .catch(err => {return res.json({message: err})});
    

});

module.exports = router;
