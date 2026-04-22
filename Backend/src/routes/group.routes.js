const express = require("express");
const restrictedUserOnly = require("../middleware/auth.middleware");
const groupedUserOnly = require("../middleware/groupedUserOnly.middleware");
const adminOnly = require("../middleware/admin.middleware");

const router = express.Router();

/* ===================== GROUP LEVEL ===================== */

// user must be logged in
router.use(restrictedUserOnly);

// create group
router.post("/", (req, res) => {
  console.log("Hello From groups create group");
  return res.status(201).json({ message: "Create group" });
});

// get groups I belong to
router.get("/my", (req, res) => {
  console.log("Hello From groups get my groups");
  return res.status(200).json({ message: "Get my groups" });
});

/* ===================== GROUP CONTEXT ===================== */
// from here, groupId is mandatory
router.use("/:groupId", groupedUserOnly);

// get group details
router.get("/:groupId", (req, res) => {
  console.log("Hello From groups get group details");
  return res.status(200).json({ message: "Get group details" });
});

/* ===================== MEMBER TASK ROUTES ===================== */

// member get my tasks
// Keep this before any :taskId route so "my" is never captured as a taskId.
router.get("/:groupId/tasks/my", (req, res) => {
  console.log("Hello From groups member get my tasks");
  return res.status(200).json({ message: "Member get my tasks" });
});

// member update task status
router.patch("/:groupId/tasks/:taskId/status", (req, res) => {
  console.log("Hello From groups member update task status");
  return res.status(200).json({ message: "Update task status" });
});

/* ===================== MEMBERSHIP (ADMIN ONLY) ===================== */

router.use("/:groupId", adminOnly);

// invite user to group
router.post("/:groupId/invite", (req, res) => {
  console.log("Hello From groups invite user");
  return res.status(200).json({ message: "Invite user to group" });
});

// get group members
router.get("/:groupId/members", (req, res) => {
  console.log("Hello From groups get members");
  return res.status(200).json({ message: "Get group members" });
});

// change member role
router.patch("/:groupId/members/:userId/role", (req, res) => {
  console.log("Hello From groups change member role");
  return res.status(200).json({ message: "Change member role" });
});

// remove member
router.delete("/:groupId/members/:userId", (req, res) => {
  console.log("Hello From groups remove member");
  return res.status(200).json({ message: "Remove member from group" });
});

/* ===================== TASK ROUTES ===================== */

// admin creates task
router.post("/:groupId/tasks", (req, res) => {
  console.log("Hello From groups admin create task");
  return res.status(201).json({ message: "Admin create task" });
});

// admin get all group tasks
router.get("/:groupId/tasks", (req, res) => {
  console.log("Hello From groups admin get tasks");
  return res.status(200).json({ message: "Admin get tasks" });
});

// task details route kept after /tasks/my to avoid route shadowing conflict.
router.get("/:groupId/tasks/:taskId", (req, res) => {
  console.log("Hello From groups get task details");
  return res.status(200).json({ message: "Get task details" });
});

module.exports = router;
