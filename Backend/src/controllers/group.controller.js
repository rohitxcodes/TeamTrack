const {
  createGroupService,
  getGroupsForUSerService,
  deleteGroupService,
  getAllMembersService,
  removeMemberService,
} = require("../services/group.service");
const { inviteUserToGroupService } = require("../services/invitation.service");
async function createGroupController(req, res) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Group name is required" });
    }
    const userId = req.user._id;
    const response = await createGroupService({ name, userId });
    return res.status(201).json({
      message: "Group Created",
      data: response,
    });
  } catch (err) {
    if (err.status == 409) {
      return res.status(409).json({ message: err.message });
    }
    return res.status(500).json({
      message: "Error in Group Creation",
    });
  }
}
async function getAllMembersController(req, res) {
  try {
    const { groupId } = req.params;
    const members = await getAllMembersService(groupId);
    return res.status(200).json({ members });
  } catch (err) {
    console.error("Error in fetching group members:", err);
    return res.status(500).json({ message: "Error in fetching group members" });
  }
}
async function getGroupsForUserContoller(req, res) {
  const userId = req.user._id;
  try {
    const groupForUser = await getGroupsForUSerService(userId);
    if (!groupForUser) {
      return res.status(404).json({ message: "User is not in any group" });
    }
    return res
      .status(200)
      .json({ message: "Groups for user are", groupForUser });
  } catch (err) {
    console.error("Error fecthing the groups for user", err);
    return res
      .status(500)
      .json({ message: "Error fecthing the groups for user" });
  }
}
async function deleteGroupByIdController(req, res) {
  const { groupId } = req.params;
  try {
    if (!groupId) {
      return res.status(400).json({ message: "group id is empty" });
    }
    const deleteGroup = await deleteGroupService(groupId);
    return res.status(200).json({ message: "Group deleted" });
  } catch (err) {
    console.error("Group was not deleted", err);
    return res.status(500).json("Error in deleting the group");
  }
}

async function inviteUserToGroupController(req, res) {
  try {
    const { groupId } = req.params;
    const { email } = req.body;
    const invitedBy = req.user._id;

    const invitation = await inviteUserToGroupService({
      groupId,
      email,
      invitedBy,
    });

    return res.status(201).json({ message: "Invitation created", invitation });
  } catch (err) {
    // map common service errors to appropriate HTTP statuses
    const msg = err.message || "Invite failed";
    if (msg.includes("groupId, email and invitedBy are required")) {
      return res.status(400).json({ message: msg });
    }
    if (msg.includes("Group not found")) {
      return res.status(404).json({ message: msg });
    }
    if (msg.includes("already a member") || msg.includes("Invitation already pending")) {
      return res.status(409).json({ message: msg });
    }
    return res.status(500).json({ message: msg });
  }
}

async function removeMemberFromGroupController(req, res) {
  try {
    const { groupId, userId } = req.params;
    const result = await removeMemberService({ groupId, userId });
    return res.status(200).json({ message: "Member removed", data: result });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || "Remove member failed" });
  }
}

module.exports = {
  createGroupController,
  getGroupsForUserContoller,
  getAllMembersController,
  deleteGroupByIdController,
  inviteUserToGroupController,
  removeMemberFromGroupController,
};
