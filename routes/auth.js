const express = require("express");

const loginHandler = require('../middlewares/loginHandler');
const createUserHandler = require('../middlewares/createUserHandler');

const router = express.Router();

// SIGN IN A USER

router.post("/login", loginHandler, (req, res) => {

});


// CREATE A NEW USER

router.post("/createUser", createUserHandler,(req, res) => {

});

module.exports = router;
