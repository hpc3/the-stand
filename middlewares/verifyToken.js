require("dotenv/config");

const createError = require("http-errors");

const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader === undefined) {
    throw createError(
      403,
      "Missing Token, must be signed in to make this request"
    );
  }

  const token = bearerHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err) => {
    if (err) {
      throw createError(401, "Token is invalid");
    }

    next();
    return;
  });
}

module.exports = verifyToken;
