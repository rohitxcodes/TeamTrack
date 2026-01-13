async function adminOnly(req, res, next) {
  const role = req.user.role;
  if (role !== "admin") {
    return res.status(403).send("access Denied");
  }
  next();
}
module.exports = adminOnly;
