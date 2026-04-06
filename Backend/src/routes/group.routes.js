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
  return res.send("create group");
});

// get groups I belong to
router.get("/my", (req, res) => {
  console.log("Hello From groups get my groups");
  return res.send("get my groups");
});

/* ===================== GROUP CONTEXT ===================== */
// from here, groupId is mandatory
router.use("/:groupId", groupedUserOnly);

// get group details
router.get("/:groupId", (req, res) => {
  console.log("Hello From groups get group details");
  return res.send("get group details");
});

/* ===================== MEMBERSHIP (ADMIN ONLY) ===================== */

router.use("/:groupId", adminOnly);

// invite user to group
router.post("/:groupId/invite", (req, res) => {
  console.log("Hello From groups invite user");
  return res.send("invite user to group");
});

// get group members
router.get("/:groupId/members", (req, res) => {
  console.log("Hello From groups get members");
  return res.send("get group members");
});

// change member role
router.patch("/:groupId/members/:userId/role", (req, res) => {
  console.log("Hello From groups change member role");
  return res.send("change member role");
});

// remove member
router.delete("/:groupId/members/:userId", (req, res) => {
  console.log("Hello From groups remove member");
  return res.send("remove member from group");
});

/* ===================== TASK ROUTES ===================== */

// admin creates task
router.post("/:groupId/tasks", (req, res) => {
  console.log("Hello From groups admin create task");
  return res.send("admin create task");
});

// admin get all group tasks
router.get("/:groupId/tasks", (req, res) => {
  console.log("Hello From groups admin get tasks");
  return res.send("admin get tasks");
});

// member get my tasks
router.get("/:groupId/tasks/my", (req, res) => {
  console.log("Hello From groups member get my tasks");
  return res.send("member get my tasks");
});

// member update task status
router.patch("/:groupId/tasks/:taskId/status", (req, res) => {
  console.log("Hello From groups member update task status");
  return res.send("update task status");
});

module.exports = router;
