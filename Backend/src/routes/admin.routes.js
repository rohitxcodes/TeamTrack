const express = require("express");
const restrictedUserOnly = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");
const {
  adminCreateTask,
  adminGetTasks,
  adminPatchTaskById,
  adminDeleteTaskById,
  adminGetUsers,
  adminDeleteUserById,
} = require("../controllers/admin.controller");
const router = express.Router();

router.use(restrictedUserOnly);
router.use(adminOnly);
router.post("/tasks", adminCreateTask);
router.get("/tasks", adminGetTasks);
router.patch("/tasks/:id", adminPatchTaskById);
router.delete("/tasks/:id", adminDeleteTaskById);
router.get("/users", adminGetUsers);
router.delete("/users/:id", adminDeleteUserById);
module.exports = router;
