const express = require("express");
const restrictedUserOnly = require("../middleware/auth.middleware");
const {
  getMyInvitationsController,
  acceptInvitationController,
  rejectInvitationController,
  cancelInvitationController,
} = require("../controllers/invitation.controller");

const router = express.Router();

router.use(restrictedUserOnly);

router.get("/", getMyInvitationsController);
router.post("/:inviteId/accept", acceptInvitationController);
router.post("/:inviteId/reject", rejectInvitationController);

// Optional: currently auth-only template. Add inviter/admin checks in service.
router.delete("/:inviteId", cancelInvitationController);

module.exports = router;
