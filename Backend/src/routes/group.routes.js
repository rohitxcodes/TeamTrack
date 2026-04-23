const express = require("express");
const restrictedUserOnly = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/admin.middleware");
const isMember = require("../middleware/member.middleware");
const {
  createGroupController,
  getGroupsForUserContoller,
  getAllMembersController,
  deleteGroupByIdController,
  inviteUserToGroupController,
  removeMemberFromGroupController,
} = require("../controllers/group.controller");
const router = express.Router();
router.use(restrictedUserOnly);
router.post("/", createGroupController);
router.get("/", getGroupsForUserContoller);
router.get("/:groupId", isMember, getAllMembersController);
router.post("/:groupId/invite", isAdmin, inviteUserToGroupController);
router.delete(
  "/:groupId/members/:userId",
  isAdmin,
  removeMemberFromGroupController,
);
router.delete("/:groupId", isAdmin, deleteGroupByIdController);
module.exports = router;
