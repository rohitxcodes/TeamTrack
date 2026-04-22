const User = require("../models/User.model");
const Task = require("../models/Task.model");
async function adminCreateTask(req, res) {
  const { title, description, status } = req.body;
  const adminId = req.user.id;

  if (!title) {
    return res.status(400).json({ message: "Task title is required" });
  }

  try {
    const task = await Task.create({
      title,
      description,
      status,
      createdBy: adminId,
    });

    return res.status(201).json({ message: "Task created", task });
  } catch (err) {
    console.log(`error is ${err}`);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
function taskToEmployee(req, res) {}
function assignmentValidation(req, res) {}
module.exports = { adminCreateTask, taskToEmployee, assignmentValidation };
