const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config/.env" });
const secretKey = process.env.JWT_SECRET;

function auth(req, res, next) {
  const token = req.header("x-auth-header");

  if (!token) {
    return res.status(401).send("No Access , token not available");
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } 
  catch (ex) {
    res.status(401).send("Invalid Token");
  }
}

module.exports = auth;
