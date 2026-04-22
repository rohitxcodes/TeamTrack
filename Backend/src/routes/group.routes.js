const express = require("express");
const restrictedUserOnly = require("../middleware/auth.middleware");
const groupedUserOnly = require("../middleware/groupedUserOnly.middleware");
const adminOnly = require("../middleware/admin.middleware");
const {
  createGroupController,
  getMyGroupsController,
  getGroupDetailsController,
  getMyTasksController,
  updateTaskStatusController,
  inviteUserController,
  getMembersController,
  changeMemberRoleController,
  removeMemberController,
  adminCreateGroupTaskController,
  adminGetGroupTasksController,
  getTaskDetailsController,
} = require("../controllers/group.controller");

const router = express.Router();
const groupContextRouter = express.Router({ mergeParams: true });
const adminGroupRouter = express.Router({ mergeParams: true });

/* ===================== GROUP LEVEL ===================== */

// user must be logged in
router.use(restrictedUserOnly);

// create group
router.post("/", createGroupController);

// get groups I belong to
router.get("/my", getMyGroupsController);

/* ===================== GROUP CONTEXT ===================== */
// from here, groupId is mandatory and user must belong to that group.
router.use("/:groupId", groupedUserOnly, groupContextRouter);

// get group details
groupContextRouter.get("/", getGroupDetailsController);

/* ===================== MEMBER TASK ROUTES ===================== */

// member get my tasks
// Keep this before any :taskId route so "my" is never captured as a taskId.
groupContextRouter.get("/tasks/my", getMyTasksController);

// member update task status
groupContextRouter.patch("/tasks/:taskId/status", updateTaskStatusController);

/* ===================== MEMBERSHIP (ADMIN ONLY) ===================== */
groupContextRouter.use(adminOnly, adminGroupRouter);

// invite user to group
adminGroupRouter.post("/invite", inviteUserController);

// get group members
adminGroupRouter.get("/members", getMembersController);

// change member role
adminGroupRouter.patch("/members/:userId/role", changeMemberRoleController);

// remove member
adminGroupRouter.delete("/members/:userId", removeMemberController);

/* ===================== TASK ROUTES ===================== */

// admin creates task
adminGroupRouter.post("/tasks", adminCreateGroupTaskController);

// admin get all group tasks
adminGroupRouter.get("/tasks", adminGetGroupTasksController);

// task details route kept after /tasks/my to avoid route shadowing conflict.
adminGroupRouter.get("/tasks/:taskId", getTaskDetailsController);

module.exports = router;
