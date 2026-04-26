const Membership = require("../models/Membership.model");
const Group = require("../models/Group.model");
async function createGroupService({ name, userId }) {
  try {
    const newGroup = await Group.create({
      name,
      createdBy: userId,
    });

    await Membership.create({
      user: userId,
      group: newGroup._id,
      role: "ADMIN",
      status: "ACTIVE",
    });
    return newGroup;
  } catch (err) {
    if (err.code === 11000) {
      const error = new Error("Group name already exists");
      error.status = 409;
      throw error;
    }
    throw err;
  }
}
async function getAllMembersService(groupId) {
  try {
    const memberships = await Membership.find({
      group: groupId,
      status: "ACTIVE",
    }).populate("user", "name email");
    return memberships;
  } catch (err) {
    throw err;
  }
}

async function getGroupsForUSerService(userId) {
  try {
    const groups = await Membership.find({ user: userId }).populate(
      "group",
      "name",
    );
    return groups.map((m) => m.group);
  } catch (err) {
    throw err;
  }
}
async function deleteGroupService(groupId) {
  try {
    await Group.findByIdAndDelete(groupId);
    await Membership.deleteMany({ group: groupId });
    return;
  } catch (err) {
    throw err;
  }
}

async function removeMemberService({ groupId, userId }) {
  if (!groupId || !userId) {
    throw new Error("Group ID and User ID are required");
  }
  try {
    const membership = await Membership.findOne({
      group: groupId,
      user: userId,
    });
    if (!membership) {
      throw new Error("Member not found in the specified group");
    }
    await Membership.deleteOne({ group: groupId, user: userId });
  } catch (err) {
    throw new Error("Failed to remove member from group: " + err.message);
  }
}

module.exports = {
  createGroupService,
  getGroupsForUSerService,
  deleteGroupService,
  getAllMembersService,
  removeMemberService,
};
