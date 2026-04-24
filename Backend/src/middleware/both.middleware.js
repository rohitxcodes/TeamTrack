const Membership = require("../models/Membership.model");
const Group = require("../models/Group.model");

async function isMemberOrAdmin(req, res, next) {
  const userId = req.user?._id;
  const groupId = req.params?.groupId;

  try {
    const groupExists = await Group.exists({ _id: groupId });
    if (!groupExists) {
      return res.status(404).json({
        message: "Group not found",
      });
    }

    const membership = await Membership.findOne({
      user: userId,
      group: groupId,
      status: "ACTIVE",
    });

    if (!membership) {
      return res.status(403).json({
        message: "Access denied: not a member",
      });
    }

    // Admin is already included here, but keep explicit if needed
    if (!["ADMIN", "MEMBER"].includes(membership.role)) {
      return res.status(403).json({
        message: "Access denied: invalid role",
      });
    }

    req.membership = membership;
    return next();
  } catch (err) {
    console.error("Error in isMemberOrAdmin:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = isMemberOrAdmin;
