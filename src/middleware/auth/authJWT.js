const PRIVATE_KEY = process.env.TOKEN;
const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  try {
    const decoded = jwt.verify(req.header("x-api-token"), PRIVATE_KEY);
    req.loggedUser = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};
