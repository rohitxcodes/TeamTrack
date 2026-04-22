const Task = require("../models/Task.model");

async function createTask({ title, description, status, adminId }) {
  if (!title) {
    return { status: 400, body: { message: "Task title is required" } };
  }

  try {
    const task = await Task.create({
      title,
      description,
      status,
      createdBy: adminId,
    });

    return { status: 201, body: { message: "Task created", task } };
  } catch (error) {
    return { status: 500, body: { message: "Something went wrong" } };
  }
}

function getTasks() {
  return { status: 200, body: { message: "Admin get tasks" } };
}

function patchTaskById() {
  return { status: 200, body: { message: "Admin patch task by id" } };
}

function deleteTaskById() {
  return { status: 200, body: { message: "Admin delete task by id" } };
}

function getUsers() {
  return { status: 200, body: { message: "Admin get all users" } };
}

function deleteUserById() {
  return { status: 200, body: { message: "Admin delete user by id" } };
}

module.exports = {
  createTask,
  getTasks,
  patchTaskById,
  deleteTaskById,
  getUsers,
  deleteUserById,
};
