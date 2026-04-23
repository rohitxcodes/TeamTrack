const Membership = require("../models/Membership.model");
async function isMember(req, res, next) {
  const userId = req.user._id;
  const groupId = req.params.groupId;
  try {
    const membership = await Membership.findOne({
      user: userId,
      group: groupId,
      status: "ACTIVE",
    });
    if (!membership) {
      return res
        .status(403)
        .json({ message: "Access denied: not a group member" });
    }
    next();
  } catch (err) {
    console.error("Error in isMember middleware:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
module.exports = isMember;
