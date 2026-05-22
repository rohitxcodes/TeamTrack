// Get ID from group/task/member object (handles both _id and id)
export function getId(obj) {
  return obj?._id || obj?.id;
}

// Get label for group
export function getGroupLabel(group) {
  return group?.name || "Unnamed group";
}

// Filter tasks assigned to current user
export function filterPersonalTasks(tasks, currentUserId) {
  return tasks.filter((t) => {
    const assignedId = t?.assignedTo?._id || t?.assignedTo?.id;
    return assignedId && currentUserId && assignedId === currentUserId;
  });
}

// Filter tasks not assigned to current user
export function filterOtherTasks(tasks, currentUserId) {
  return tasks.filter((t) => {
    const assignedId = t?.assignedTo?._id || t?.assignedTo?.id;
    return !(assignedId && currentUserId && assignedId === currentUserId);
  });
}

// Separate invitations into pending and accepted
export function separateInvitations(invitations) {
  return {
    pending: invitations.filter(
      (i) => (i?.status || "PENDING").toUpperCase() === "PENDING",
    ),
    accepted: invitations.filter(
      (i) => (i?.status || "PENDING").toUpperCase() === "ACCEPTED",
    ),
  };
}

export function isValidEmail(value) {
  if (!value || typeof value !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
