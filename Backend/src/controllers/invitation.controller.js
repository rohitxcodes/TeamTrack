const {
  getMyInvitationsService,
  acceptInvitationService,
  rejectInvitationService,
  cancelInvitationService,
} = require("../services/invitation.service");

async function getMyInvitationsController(req, res) {
  try {
    const invitations = await getMyInvitationsService({
      email: req.user.email,
    });

    return res.status(200).json({ invitations });
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message || "Error in fetching invitations" });
  }
}

async function acceptInvitationController(req, res) {
  try {
    const { inviteId } = req.params;
    const result = await acceptInvitationService({ inviteId, user: req.user });
    return res.status(200).json({ message: "Invitation accepted", ...result });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Accept failed" });
  }
}

async function rejectInvitationController(req, res) {
  try {
    const { inviteId } = req.params;
    const invitation = await rejectInvitationService({
      inviteId,
      user: req.user,
    });
    return res.status(200).json({ message: "Invitation rejected", invitation });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Reject failed" });
  }
}

async function cancelInvitationController(req, res) {
  try {
    const { inviteId } = req.params;
    const invitation = await cancelInvitationService({
      inviteId,
      user: req.user,
    });
    return res.status(200).json({ message: "Invitation canceled", invitation });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Cancel failed" });
  }
}

module.exports = {
  getMyInvitationsController,
  acceptInvitationController,
  rejectInvitationController,
  cancelInvitationController,
};
