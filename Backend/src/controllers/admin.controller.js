const {
  createTask,
  getTasks,
  patchTaskById,
  deleteTaskById,
  getUsers,
  deleteUserById,
} = require("../services/admin.service");

async function adminCreateTask(req, res) {
  const { title, description, status } = req.body;
  const adminId = req.user.id;
  const response = await createTask({ title, description, status, adminId });
  return res.status(response.status).json(response.body);
}

function adminGetTasks(req, res) {
  const response = getTasks();
  return res.status(response.status).json(response.body);
}

function adminPatchTaskById(req, res) {
  const response = patchTaskById(req.params.id, req.body);
  return res.status(response.status).json(response.body);
}

function adminDeleteTaskById(req, res) {
  const response = deleteTaskById(req.params.id);
  return res.status(response.status).json(response.body);
}

function adminGetUsers(req, res) {
  const response = getUsers();
  return res.status(response.status).json(response.body);
}

function adminDeleteUserById(req, res) {
  const response = deleteUserById(req.params.id);
  return res.status(response.status).json(response.body);
}

module.exports = {
  adminCreateTask,
  adminGetTasks,
  adminPatchTaskById,
  adminDeleteTaskById,
  adminGetUsers,
  adminDeleteUserById,
};
