const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get token

  const token = req.header("x-auth-token");

  //check for no token

  if (!token) {
    return res.status(401).json({ msg: "No token. Auth Denied" });
  }

  //Verify
  try {
    const decoded = jwt.verify(token, config.get("jwtToken"));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token not valid" });
  }
};
