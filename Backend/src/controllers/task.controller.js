// src/controllers/task.controller.js
const {
  createGroupTaskService,
  getGroupTasksService,
  getGroupTaskByIdService,
  updateGroupTaskService,
  deleteGroupTaskService,
  createPersonalTaskService,
  getPersonalTasksService,
  updatePersonalTaskService,
  deletePersonalTaskService,
} = require("../services/task.service");

// ── Group Tasks ──────────────────────────────────────────────

async function createGroupTaskController(req, res) {
  try {
    const { groupId } = req.params;
    const task = await createGroupTaskService({
      ...req.body,
      groupId,
      createdBy: req.user._id,
    });
    return res.status(201).json({ message: "Task created", task });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}

async function getGroupTasksController(req, res) {
  try {
    const { groupId } = req.params;
    const { status } = req.query;
    const tasks = await getGroupTasksService({
      groupId,
      membershipRole: req.membership.role,
      userId: req.user._id,
      status,
    });
    return res.status(200).json({ tasks });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}

async function getGroupTaskByIdController(req, res) {
  try {
    const { groupId, taskId } = req.params;
    const task = await getGroupTaskByIdService({
      taskId,
      groupId,
      membershipRole: req.membership.role,
      userId: req.user._id,
    });
    return res.status(200).json({ task });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}

async function updateGroupTaskController(req, res) {
  try {
    const { groupId, taskId } = req.params;
    const task = await updateGroupTaskService({
      taskId,
      groupId,
      updates: req.body,
      membershipRole: req.membership.role,
      userId: req.user._id,
    });
    return res.status(200).json({ message: "Task updated", task });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}

async function deleteGroupTaskController(req, res) {
  try {
    const { groupId, taskId } = req.params;
    await deleteGroupTaskService({ taskId, groupId });
    return res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}

// ── Personal Tasks ───────────────────────────────────────────

async function createPersonalTaskController(req, res) {
  try {
    const task = await createPersonalTaskService({
      ...req.body,
      userId: req.user._id,
    });
    return res.status(201).json({ message: "Personal task created", task });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}

async function getPersonalTasksController(req, res) {
  try {
    const { status } = req.query;
    const tasks = await getPersonalTasksService({
      userId: req.user._id,
      status,
    });
    return res.status(200).json({ tasks });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}

async function updatePersonalTaskController(req, res) {
  try {
    const { taskId } = req.params;
    const task = await updatePersonalTaskService({
      taskId,
      userId: req.user._id,
      updates: req.body,
    });
    return res.status(200).json({ message: "Task updated", task });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}

async function deletePersonalTaskController(req, res) {
  try {
    const { taskId } = req.params;
    await deletePersonalTaskService({ taskId, userId: req.user._id });
    return res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
}

module.exports = {
  createGroupTaskController,
  getGroupTasksController,
  getGroupTaskByIdController,
  updateGroupTaskController,
  deleteGroupTaskController,
  createPersonalTaskController,
  getPersonalTasksController,
  updatePersonalTaskController,
  deletePersonalTaskController,
};
