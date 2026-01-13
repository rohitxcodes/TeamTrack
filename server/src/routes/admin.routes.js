const express = require("express");
const restrictedUserOnly = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");
const {
  adminCreateTask,
  taskToEmployee,
  assignmentValidation,
} = require("../controllers/admin.controller");
const router = express.Router();

router.use(restrictedUserOnly);
router.use(adminOnly);
router.post("/tasks", adminCreateTask);
router.get("/tasks", (req, res) => {
  return res.send("admin routes get tasks");
});
router.patch("/tasks/:id", (req, res) => {
  return res.send("admin routes patch tasks id");
});
router.delete("/tasks/:id", (req, res) => {
  return res.send("admin routes delete tasks");
});
router.get("/users", (req, res) => {
  return res.send("admin routes get all users");
});
router.delete("/users/:id", (req, res) => {
  return res.send("Delete users id ");
});
module.exports = router;
