// src/services/task.service.js
const Task = require("../models/Task.model");
const Membership = require("../models/Membership.model");

const POPULATE_FIELDS = [
  { path: "createdBy", select: "name email" },
  { path: "assignedTo", select: "name email" },
];

// ── Group Tasks ──────────────────────────────────────────────

async function createGroupTaskService({
  title,
  description,
  assignedTo,
  priority,
  dueDate,
  groupId,
  createdBy,
}) {
  if (assignedTo) {
    const membership = await Membership.findOne({
      user: assignedTo,
      group: groupId,
      status: "ACTIVE",
    });
    if (!membership) {
      throw Object.assign(
        new Error("Assigned user is not an active member of this group"),
        { status: 422 },
      );
    }
  }

  const task = await Task.create({
    title,
    description,
    assignedTo: assignedTo ?? null,
    priority,
    dueDate: dueDate ?? null,
    group: groupId,
    createdBy,
  });

  await task.populate(POPULATE_FIELDS);
  return task;
}

async function getGroupTasksService({
  groupId,
  membershipRole,
  userId,
  status,
}) {
  const query = { group: groupId };

  // Members only see their own assigned tasks — hard rule from PRD
  if (membershipRole === "MEMBER") {
    query.assignedTo = userId;
  }

  if (status) query.status = status;

  return Task.find(query)
    .populate(POPULATE_FIELDS)
    .sort({ createdAt: -1 })
    .lean();
}

async function getGroupTaskByIdService({
  taskId,
  groupId,
  membershipRole,
  userId,
}) {
  const task = await Task.findOne({ _id: taskId, group: groupId })
    .populate(POPULATE_FIELDS)
    .lean();

  if (!task) throw Object.assign(new Error("Task not found"), { status: 404 });

  if (
    membershipRole === "MEMBER" &&
    task.assignedTo?._id.toString() !== userId.toString()
  ) {
    throw Object.assign(new Error("Access denied"), { status: 403 });
  }

  return task;
}

async function updateGroupTaskService({
  taskId,
  groupId,
  updates,
  membershipRole,
  userId,
}) {
  const task = await Task.findOne({ _id: taskId, group: groupId });
  if (!task) throw Object.assign(new Error("Task not found"), { status: 404 });

  if (membershipRole === "MEMBER") {
    if (task.assignedTo?.toString() !== userId.toString()) {
      throw Object.assign(
        new Error("You can only update your own assigned tasks"),
        { status: 403 },
      );
    }
    // Members can only touch status — strip everything else
    const allowedKeys = new Set(["status"]);
    const forbidden = Object.keys(updates).filter((k) => !allowedKeys.has(k));
    if (forbidden.length > 0) {
      throw Object.assign(new Error("Members can only update task status"), {
        status: 403,
      });
    }
  }

  // Validate reassignment target is a group member
  if (updates.assignedTo) {
    const membership = await Membership.findOne({
      user: updates.assignedTo,
      group: groupId,
      status: "ACTIVE",
    });
    if (!membership) {
      throw Object.assign(
        new Error("Reassignment target is not an active group member"),
        { status: 422 },
      );
    }
  }

  Object.assign(task, updates);
  await task.save();
  await task.populate(POPULATE_FIELDS);
  return task;
}

async function deleteGroupTaskService({ taskId, groupId }) {
  const task = await Task.findOneAndDelete({ _id: taskId, group: groupId });
  if (!task) throw Object.assign(new Error("Task not found"), { status: 404 });
  return task;
}

// ── Personal Tasks ───────────────────────────────────────────

async function createPersonalTaskService({
  title,
  description,
  priority,
  dueDate,
  status,
  userId,
}) {
  const task = await Task.create({
    title,
    description,
    priority,
    dueDate: dueDate ?? null,
    status,
    createdBy: userId,
    group: null,
  });
  return task;
}

async function getPersonalTasksService({ userId, status }) {
  const query = { createdBy: userId, group: null };
  if (status) query.status = status;

  return Task.find(query).sort({ createdAt: -1 }).lean();
}

async function updatePersonalTaskService({ taskId, userId, updates }) {
  const task = await Task.findOne({
    _id: taskId,
    createdBy: userId,
    group: null,
  });
  if (!task) throw Object.assign(new Error("Task not found"), { status: 404 });

  Object.assign(task, updates);
  await task.save();
  return task;
}

async function deletePersonalTaskService({ taskId, userId }) {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    createdBy: userId,
    group: null,
  });
  if (!task) throw Object.assign(new Error("Task not found"), { status: 404 });
  return task;
}

module.exports = {
  createGroupTaskService,
  getGroupTasksService,
  getGroupTaskByIdService,
  updateGroupTaskService,
  deleteGroupTaskService,
  createPersonalTaskService,
  getPersonalTasksService,
  updatePersonalTaskService,
  deletePersonalTaskService,
};
