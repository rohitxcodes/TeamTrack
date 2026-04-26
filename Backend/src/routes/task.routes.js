const express = require("express");
const restrictedUserOnly = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  createPersonalTaskSchema,
  updatePersonalTaskSchema,
} = require("../validators/task.validator");
const {
  createPersonalTaskController,
  getPersonalTasksController,
  updatePersonalTaskController,
  deletePersonalTaskController,
} = require("../controllers/task.controller");

const router = express.Router();

router.use(restrictedUserOnly);

router.post(
  "/",
  validate(createPersonalTaskSchema),
  createPersonalTaskController,
);
router.get("/", getPersonalTasksController);
router.patch(
  "/:taskId",
  validate(updatePersonalTaskSchema),
  updatePersonalTaskController,
);
router.delete("/:taskId", deletePersonalTaskController);

// Backward-compatible aliases when router is mounted at /api/tasks
router.post(
  "/personal",
  validate(createPersonalTaskSchema),
  createPersonalTaskController,
);
router.get("/personal", getPersonalTasksController);
router.patch(
  "/personal/:taskId",
  validate(updatePersonalTaskSchema),
  updatePersonalTaskController,
);
router.delete("/personal/:taskId", deletePersonalTaskController);

module.exports = router;
