function createGroup() {
  return { status: 201, body: { message: "Create group" } };
}

function getMyGroups() {
  return { status: 200, body: { message: "Get my groups" } };
}

function getGroupDetails() {
  return { status: 200, body: { message: "Get group details" } };
}

function getMyTasks() {
  return { status: 200, body: { message: "Member get my tasks" } };
}

function updateTaskStatus() {
  return { status: 200, body: { message: "Update task status" } };
}

function inviteUser() {
  return { status: 200, body: { message: "Invite user to group" } };
}

function getMembers() {
  return { status: 200, body: { message: "Get group members" } };
}

function changeMemberRole() {
  return { status: 200, body: { message: "Change member role" } };
}

function removeMember() {
  return { status: 200, body: { message: "Remove member from group" } };
}

function adminCreateGroupTask() {
  return { status: 201, body: { message: "Admin create task" } };
}

function adminGetGroupTasks() {
  return { status: 200, body: { message: "Admin get tasks" } };
}

function getTaskDetails() {
  return { status: 200, body: { message: "Get task details" } };
}

module.exports = {
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
};
