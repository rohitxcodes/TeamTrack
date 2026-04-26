const express = require("express");
const restrictedUserOnly = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/admin.middleware");
const isMemberOrAdmin = require("../middleware/both.middleware");
const validate = require("../middleware/validate.middleware");
const {
  createGroupTaskSchema,
  updateGroupTaskSchema,
} = require("../validators/task.validator");
const {
  createGroupController,
  getGroupsForUserContoller,
  getAllMembersController,
  deleteGroupByIdController,
  inviteUserToGroupController,
  removeMemberFromGroupController,
} = require("../controllers/group.controller");
const {
  createGroupTaskController,
  getGroupTasksController,
  getGroupTaskByIdController,
  updateGroupTaskController,
  deleteGroupTaskController,
} = require("../controllers/task.controller");

const router = express.Router();

router.use(restrictedUserOnly);

// ── Group CRUD ───────────────────────────────────────────────
router.post("/", createGroupController);
router.get("/", getGroupsForUserContoller);
router.get("/:groupId", isMemberOrAdmin, getAllMembersController);
router.post("/:groupId/invite", isAdmin, inviteUserToGroupController);
router.delete(
  "/:groupId/members/:userId",
  isAdmin,
  removeMemberFromGroupController,
);
router.delete("/:groupId", isAdmin, deleteGroupByIdController);

// ── Group Tasks ──────────────────────────────────────────────
router.post(
  "/:groupId/tasks",
  isAdmin,
  validate(createGroupTaskSchema),
  createGroupTaskController,
);
router.get("/:groupId/tasks", isMemberOrAdmin, getGroupTasksController);
router.get(
  "/:groupId/tasks/:taskId",
  isMemberOrAdmin,
  getGroupTaskByIdController,
);
router.patch(
  "/:groupId/tasks/:taskId",
  isMemberOrAdmin,
  validate(updateGroupTaskSchema),
  updateGroupTaskController,
);
router.delete("/:groupId/tasks/:taskId", isAdmin, deleteGroupTaskController);

module.exports = router;
