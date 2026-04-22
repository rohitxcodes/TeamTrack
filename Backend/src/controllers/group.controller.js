const {
  createGroup,
  getMyGroups,
  getGroupDetails,
  getMyTasks,
  updateTaskStatus,
  inviteUser,
  getMembers,
  changeMemberRole,
  removeMember,
  adminCreateGroupTask,
  adminGetGroupTasks,
  getTaskDetails,
} = require("../services/group.service");

function createGroupController(req, res) {
  const response = createGroup(req.body, req.user);
  return res.status(response.status).json(response.body);
}

function getMyGroupsController(req, res) {
  const response = getMyGroups(req.user);
  return res.status(response.status).json(response.body);
}

function getGroupDetailsController(req, res) {
  const response = getGroupDetails(req.params.groupId, req.user);
  return res.status(response.status).json(response.body);
}

function getMyTasksController(req, res) {
  const response = getMyTasks(req.params.groupId, req.user);
  return res.status(response.status).json(response.body);
}

function updateTaskStatusController(req, res) {
  const response = updateTaskStatus(
    req.params.groupId,
    req.params.taskId,
    req.body,
  );
  return res.status(response.status).json(response.body);
}

function inviteUserController(req, res) {
  const response = inviteUser(req.params.groupId, req.body);
  return res.status(response.status).json(response.body);
}

function getMembersController(req, res) {
  const response = getMembers(req.params.groupId);
  return res.status(response.status).json(response.body);
}

function changeMemberRoleController(req, res) {
  const response = changeMemberRole(
    req.params.groupId,
    req.params.userId,
    req.body,
  );
  return res.status(response.status).json(response.body);
}

function removeMemberController(req, res) {
  const response = removeMember(req.params.groupId, req.params.userId);
  return res.status(response.status).json(response.body);
}

function adminCreateGroupTaskController(req, res) {
  const response = adminCreateGroupTask(req.params.groupId, req.body, req.user);
  return res.status(response.status).json(response.body);
}

function adminGetGroupTasksController(req, res) {
  const response = adminGetGroupTasks(req.params.groupId);
  return res.status(response.status).json(response.body);
}

function getTaskDetailsController(req, res) {
  const response = getTaskDetails(req.params.groupId, req.params.taskId);
  return res.status(response.status).json(response.body);
}

module.exports = {
  createGroupController,
  getMyGroupsController,
  getGroupDetailsController,
  getMyTasksController,
  updateTaskStatusController,
  inviteUserController,
  getMembersController,
  changeMemberRoleController,
  removeMemberController,
  adminCreateGroupTaskController,
  adminGetGroupTasksController,
  getTaskDetailsController,
};
