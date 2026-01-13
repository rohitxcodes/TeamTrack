const User = require("../models/User.model");
const Task = require("../models/Task.model");
async function adminCreateTask(req, res) {
  const { title, description, status } = req.body;
  const adminId = req.user.id;
  try {
    const task = await Task.create({
      title,
      description,
      status,
      createdBy: adminId,
    });
    console.log(task);
    return res.status(201).send("Task Created");
  } catch (err) {
    console.log(`error is ${err}`);
    return res.status(500).send("Something Went wrong");
  }
}
function taskToEmployee(req, res) {}
function assignmentValidation(req, res) {}
module.exports = { adminCreateTask, taskToEmployee, assignmentValidation };
