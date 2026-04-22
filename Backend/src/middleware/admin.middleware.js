async function adminOnly(req, res, next) {
  const role = req.user.role;
  if (role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  return next();
}
module.exports = adminOnly;
