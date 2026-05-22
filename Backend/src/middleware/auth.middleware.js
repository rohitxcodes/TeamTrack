const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

function getTokenFromRequest(req) {
  const cookieToken = req.cookies.token;
  if (cookieToken) {
    return cookieToken;
  }

  const authorization = req.headers.authorization || "";
  const [scheme, token] = authorization.split(" ");
  if (scheme === "Bearer" && token) {
    return token;
  }

  return null;
}

async function restrictedUserOnly(req, res, next) {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not configured" });
    }

    const token = getTokenFromRequest(req);
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = restrictedUserOnly;
