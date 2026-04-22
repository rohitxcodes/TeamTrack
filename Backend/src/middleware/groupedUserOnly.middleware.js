const Membership = require("../models/Membership.model");

async function groupedUserOnly(req, res, next) {
  const { groupId } = req.params;

  if (!groupId) {
    return res.status(400).json({ message: "Group id is required" });
  }

  const membership = await Membership.findOne({
    group: groupId,
    user: req.user._id,
  });

  if (!membership) {
    return res.status(403).json({ message: "Access denied for this group" });
  }

  req.membership = membership;
  return next();
}

module.exports = groupedUserOnly;
