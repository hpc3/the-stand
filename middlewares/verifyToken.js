require("dotenv/config");


const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

  try{
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    next();
    return;

  }
  catch(error){
    res.json(error);
  }

}

module.exports = verifyToken;
