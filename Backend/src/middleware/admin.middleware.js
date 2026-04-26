const Membership = require("../models/Membership.model");
const Group = require("../models/Group.model");
async function isAdmin(req, res, next) {
  const userId = req.user._id;
  const groupId = req.params.groupId;
  try {
    const group = await Group.findById(groupId).select("createdBy");
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const membership = await Membership.findOne({
      user: userId,
      group: groupId,
      status: "ACTIVE",
    });

    const isGroupCreator = String(group.createdBy) === String(userId);
    const isAdminMember =
      membership && String(membership.role).toUpperCase() === "ADMIN";

    if (!isGroupCreator && !isAdminMember) {
      return res
        .status(403)
        .json({ message: "Only admins can perform this action" });
    }

    req.membership = membership || null;
    return next();
  } catch (err) {
    console.error("Error in isAdmin middleware:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
module.exports = isAdmin;
