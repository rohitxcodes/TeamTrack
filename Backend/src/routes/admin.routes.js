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
  return res.status(200).json({ message: "Admin get tasks" });
});
router.patch("/tasks/:id", (req, res) => {
  return res.status(200).json({ message: "Admin patch task by id" });
});
router.delete("/tasks/:id", (req, res) => {
  return res.status(200).json({ message: "Admin delete task by id" });
});
router.get("/users", (req, res) => {
  return res.status(200).json({ message: "Admin get all users" });
});
router.delete("/users/:id", (req, res) => {
  return res.status(200).json({ message: "Admin delete user by id" });
});
module.exports = router;
