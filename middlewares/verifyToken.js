require("dotenv/config");


const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

  try{

    const bearerHeader = req.headers["authorization"];

    if(bearerHeader === undefined){
      throw Error("No token given, must be signed in to make this request");
    }

    const token = bearerHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    next();
    return;
 
  }
  catch(error){
    next(error);
    return;
  }

}

module.exports = verifyToken;
