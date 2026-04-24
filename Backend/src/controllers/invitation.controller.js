const {
  inviteUserToGroupService,
  getMyInvitationsService,
  acceptInvitationService,
  rejectInvitationService,
  cancelInvitationService,
} = require("../services/invitation.service");

async function inviteUserController(req, res) {
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
    return res.status(500).json({ message: err.message || "Invite failed" });
  }
}

async function getMyInvitationsController(req, res) {
  try {
    const email = req.user.email;
    console.log(email);
    const invitations = await getMyInvitationsService({ email });
    return res.status(200).json({ invitations });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || "Fetching invitations failed" });
  }
}

async function acceptInvitationController(req, res) {
  try {
    const { inviteId } = req.params;
    const user = req.user;
    const result = await acceptInvitationService({ inviteId, user });
    return res
      .status(200)
      .json({ message: "Invitation accepted", data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Accept failed" });
  }
}

async function rejectInvitationController(req, res) {
  try {
    const { inviteId } = req.params;
    const user = req.user;
    const result = await rejectInvitationService({ inviteId, user });
    return res
      .status(200)
      .json({ message: "Invitation rejected", data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Reject failed" });
  }
}

async function cancelInvitationController(req, res) {
  try {
    const { inviteId } = req.params;
    const user = req.user;
    const result = await cancelInvitationService({ inviteId, user });
    return res
      .status(200)
      .json({ message: "Invitation cancelled", data: result });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Cancel failed" });
  }
}

module.exports = {
  inviteUserController,
  getMyInvitationsController,
  acceptInvitationController,
  rejectInvitationController,
  cancelInvitationController,
};
