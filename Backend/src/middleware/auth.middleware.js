const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
async function restrictedUserOnly(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.send("Not authenticated");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.send("USER NOT FOUND");
    req.user = user;
    next();
  } catch (err) {
    return res.send("invalid Token");
  }
}
module.exports = restrictedUserOnly;
