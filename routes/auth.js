require("dotenv/config");

const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const loginHandler = require('../middlewares/loginHandler');

const User = require("../models/User");

const router = express.Router();

// SIGN IN A USER

router.post("/login", loginHandler, (req, res) => {
  res.send();
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
